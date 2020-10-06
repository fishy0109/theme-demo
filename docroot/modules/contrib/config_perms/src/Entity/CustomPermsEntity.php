<?php

namespace Drupal\config_perms\Entity;

use Drupal\Core\Config\Entity\ConfigEntityBase;
use Drupal\config_perms\CustomPermsEntityInterface;

/**
 * Defines the Custom perms entity entity.
 *
 * @ConfigEntityType(
 *   id = "custom_perms_entity",
 *   label = @Translation("Custom perms entity"),
 *   handlers = {
 *     "list_builder" = "Drupal\config_perms\CustomPermsEntityListBuilder",
 *     "form" = {
 *       "add" = "Drupal\config_perms\Form\CustomPermsEntityForm",
 *       "edit" = "Drupal\config_perms\Form\CustomPermsEntityForm",
 *       "delete" = "Drupal\config_perms\Form\CustomPermsEntityDeleteForm"
 *     }
 *   },
 *   config_prefix = "custom_perms_entity",
 *   admin_permission = "administer config permissions",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "label",
 *     "uuid" = "uuid"
 *   },
 *   links = {
 *     "canonical" = "/admin/structure/custom_perms_entity/{custom_perms_entity}",
 *     "edit-form" = "/admin/structure/custom_perms_entity/{custom_perms_entity}/edit",
 *     "delete-form" = "/admin/structure/custom_perms_entity/{custom_perms_entity}/delete",
 *     "collection" = "/admin/structure/visibility_group"
 *   }
 * )
 */
class CustomPermsEntity extends ConfigEntityBase implements CustomPermsEntityInterface {
  /**
   * The Custom perms entity ID.
   *
   * @var string
   */
  protected $id;

  /**
   * The Custom perms entity label.
   *
   * @var string
   */
  protected $label;

  /**
   * The Custom perms entity ID.
   *
   * @var bool
   */
  protected $status;

  /**
   * The Custom perms entity ID.
   *
   * @var string
   */
  protected $path;

  /**
   * Get the permission status.
   */
  public function getStatus() {
    return $this->status;
  }

  /**
   * Get the permission paths.
   */
  public function getPath() {
    return $this->path;
  }

}
