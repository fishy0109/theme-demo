<?php

namespace Drupal\config_perms\Routing;

use Drupal\Core\Routing\RouteSubscriberBase;
use Symfony\Component\Routing\RouteCollection;
use Drupal\config_perms\Entity\CustomPermsEntity;

/**
 * Class RouteSubscriber.
 *
 * @package Drupal\config_perms\Routing
 * Listens to the dynamic route events.
 */
class RouteSubscriber extends RouteSubscriberBase {

  /**
   * {@inheritdoc}
   */
  protected function alterRoutes(RouteCollection $collection) {
    $custom_perms = CustomPermsEntity::loadMultiple();
    foreach ($custom_perms as $custom_perm) {
      if ($custom_perm->getStatus()) {
        $paths = $this->configPermsParsePath($custom_perm->getPath());
        foreach ($paths as $path) {
          $path = ($path[0] == '/') ? $path : '/' . $path;
          $url_object = \Drupal::service('path.validator')->getUrlIfValidWithoutAccessCheck($path);
          if ($url_object) {
            $route_name = $url_object->getRouteName();
            if ($route = $collection->get($route_name)) {
              $route->setRequirement('_permission', $custom_perm->label());
            }
          }
        }
      }
    }
  }

  /**
   * Custom permission paths to array of paths.
   *
   * @param string $path
   *   Path(s) given by the user.
   *
   * @return array|string
   *   Implode paths in array of strings.
   */
  public function configPermsParsePath($path) {
    if (is_array($path)) {
      $string = implode("\n", $path);
      return $string;
    }
    else {
      $path = str_replace(["\r\n", "\n\r", "\n", "\r"], "\n", $path);
      $parts = explode("\n", $path);
      return $parts;
    }
  }

}
