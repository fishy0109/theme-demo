<?php

declare(strict_types = 1);

namespace Drupal\scheduled_transitions\Plugin\views\field;

use Drupal\Core\Access\AccessManagerInterface;
use Drupal\Core\Access\AccessResult;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Entity\TranslatableInterface;
use Drupal\views\Plugin\views\field\LinkBase;
use Drupal\views\ResultRow;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Link to the scheduled revision.
 *
 * @ViewsField("scheduled_transitions_revision_link")
 */
class ScheduledTransitionRevisionLinkField extends LinkBase {

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * Constructs a new ScheduledTransitionRevisionLinkField.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param \Drupal\Core\Access\AccessManagerInterface $access_manager
   *   The access manager.
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entityTypeManager
   *   The entity type manager.
   */
  public function __construct(array $configuration, $plugin_id, $plugin_definition, AccessManagerInterface $access_manager, EntityTypeManagerInterface $entityTypeManager) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $access_manager);
    $this->entityTypeManager = $entityTypeManager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->get('access_manager'),
      $container->get('entity_type.manager')
    );
  }

  /**
   * {@inheritdoc}
   */
  protected function checkUrlAccess(ResultRow $row) {
    /** @var \Drupal\scheduled_transitions\Entity\ScheduledTransitionInterface $scheduledTransition */
    $scheduledTransition = $this->getEntity($row);
    $entity = $scheduledTransition->getEntity();
    if (!$entity->getEntityType()->hasLinkTemplate('revision')) {
      return AccessResult::neutral('Entity does not have a revision/canonical template.');
    }
    return parent::checkUrlAccess($row);
  }

  /**
   * {@inheritdoc}
   */
  protected function getUrlInfo(ResultRow $row) {
    /** @var \Drupal\scheduled_transitions\Entity\ScheduledTransitionInterface $scheduledTransition */
    $scheduledTransition = $this->getEntity($row);

    $entity = $scheduledTransition->getEntity();
    $entityRevisionId = $scheduledTransition->getEntityRevisionId();
    $entityRevision = $this->entityTypeManager
      ->getStorage($entity->getEntityTypeId())
      ->loadRevision($entityRevisionId);
    $language = $scheduledTransition->getEntityRevisionLanguage();
    if ($language && $entityRevision instanceof TranslatableInterface && $entityRevision->hasTranslation($language)) {
      $entityRevision = $entityRevision->getTranslation($language);
    }

    $toUrlArgs = [];
    if ($entityRevision->hasLinkTemplate('revision')) {
      $toUrlArgs[] = 'revision';
    }
    return $entityRevision->toUrl(...$toUrlArgs);
  }

  /**
   * {@inheritdoc}
   */
  protected function renderLink(ResultRow $row) {
    /** @var \Drupal\scheduled_transitions\Entity\ScheduledTransitionInterface $scheduledTransition */
    $scheduledTransition = $this->getEntity($row);

    $entity = $scheduledTransition->getEntity();
    $entityRevisionId = $scheduledTransition->getEntityRevisionId();
    $entityRevision = $this->entityTypeManager
      ->getStorage($entity->getEntityTypeId())
      ->loadRevision($entityRevisionId);
    if (!$entityRevision) {
      return '';
    }
    $text = parent::renderLink($row);
    $this->options['alter']['query'] = $this->getDestinationArray();
    return $text;
  }

  /**
   * {@inheritdoc}
   */
  protected function getDefaultLabel() {
    return $this->t('View revision');
  }

}
