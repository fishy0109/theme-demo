<?php

namespace Drupal\config_perms;

use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Drupal\Core\Entity\EntityManagerInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides dynamic permissions of the filter module.
 */
class CustomPermissions implements ContainerInjectionInterface {

  use StringTranslationTrait;

  /**
   * The entity manager.
   *
   * @var \Drupal\Core\Entity\EntityManagerInterface
   */
  protected $entityManager;

  /**
   * Constructs a new FilterPermissions instance.
   *
   * @param \Drupal\Core\Entity\EntityManagerInterface $entity_manager
   *   The entity manager.
   */
  public function __construct(EntityManagerInterface $entity_manager) {
    $this->entityManager = $entity_manager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static($container->get('entity.manager'));
  }

  /**
   * Returns an array of filter permissions.
   *
   * @return array
   *   Return a table of permissions
   */
  public function permissions() {
    $permissions = [];
    // Generate permissions for each text format. Warn the administrator that
    // any of them are potentially unsafe.
    /** @var \Drupal\filter\FilterFormatInterface[] $formats */
    $custom_perms = $this->entityManager->getStorage('custom_perms_entity')->loadByProperties(['status' => TRUE]);
    uasort($custom_perms, 'Drupal\Core\Config\Entity\ConfigEntityBase::sort');
    foreach ($custom_perms as $custom_perm) {
      if ($permission = $custom_perm->label()) {
        $permissions[$permission] = [
          'title' => $permission,
          'description' => [
            '#prefix' => '<em>',
            '#markup' => $this->t('Warning: This permission may have security implications.'),
            '#suffix' => '</em>',
          ],
        ];
      }
    }
    return $permissions;
  }

}
