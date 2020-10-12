<?php

namespace Drupal\panelizer\Form;

use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Plugin\Context\ContextInterface;
use Drupal\ctools\ContextMapperInterface;
use Drupal\ctools\Form\ContextConfigure;
use Drupal\Core\TempStore\SharedTempStoreFactory;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 *
 */
class PanelizerWizardContextConfigure extends ContextConfigure {

  /**
   * The context mapper.
   *
   * @var \Drupal\ctools\ContextMapperInterface
   */
  protected $contextMapper;

  /**
   * PanelizerWizardContextConfigure constructor.
   *
   * @param \Drupal\Core\TempStore\SharedTempStoreFactory $tempstore
   *   The shared tempstore factory.
   * @param \Drupal\ctools\ContextMapperInterface $context_mapper
   *   The context mapper.
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity type manager.
   */
  public function __construct(SharedTempStoreFactory $tempstore, ContextMapperInterface $context_mapper, EntityTypeManagerInterface $entity_type_manager) {
    parent::__construct($tempstore, $entity_type_manager);
    $this->contextMapper = $context_mapper;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('tempstore.shared'),
      $container->get('ctools.context_mapper'),
      $container->get('entity_type.manager')
    );
  }

  /**
   * {@inheritdoc}
   */
  protected function getParentRouteInfo($cached_values) {
    return ['panelizer.wizard.add.step', [
      'machine_name' => $cached_values['id'],
      'step' => 'contexts',
    ]];
  }

  /**
   * {@inheritdoc}
   */
  protected function getContexts($cached_values) {
    $static_contexts = isset($cached_values['contexts']) ? $cached_values['contexts'] : [];
    $static_contexts = $this->contextMapper->getContextValues($static_contexts);
    return $static_contexts;
  }

  /**
   * {@inheritdoc}
   */
  protected function addContext($cached_values, $context_id, ContextInterface $context) {
    $cached_values['contexts'][$context_id] = [
      'label' => $context->getContextDefinition()->getLabel(),
      'type' => $context->getContextDefinition()->getDataType(),
      'description' => $context->getContextDefinition()->getDescription(),
      'value' => strpos($context->getContextDefinition()->getDataType(), 'entity:') === 0 ? $context->getContextValue()->uuid() : $context->getContextValue(),
    ];
    return $cached_values;
  }

  /**
   * {@inheritdoc}
   */
  public function contextExists($value, $element, $form_state) {
    return FALSE;
  }

  /**
   * {@inheritdoc}
   */
  protected function disableMachineName($cached_values, $machine_name) {
    return !empty($cached_values['contexts'][$machine_name]);
  }

}
