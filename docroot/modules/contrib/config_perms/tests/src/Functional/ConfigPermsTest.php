<?php

namespace Drupal\Tests\config_perms\Functional;

use Drupal\Tests\BrowserTestBase;

/**
 * Tests that the perms are working.
 *
 * @group config_perms
 */
class ConfigPermsTest extends BrowserTestBase {


  protected static $modules = ['config_perms'];

  public function testAdministerConfigPermsPermission() {
    $user_with_permission = $this->drupalCreateUser(['administer config permissions']);
    $user_without_permission = $this->drupalCreateUser();

    // Assert that the user with the permission can administer the module.
    $this->drupalLogin($user_with_permission);
    $this->drupalGet('/admin/people/custom-permissions/list');
    $this->assertSession()->statusCodeEquals(200);
    $this->drupalLogout();

    // Assert that the user without the permission cannot access the page.
    $this->drupalLogin($user_without_permission);
    $this->drupalGet('/admin/people/custom-permissions/list');
    $this->assertSession()->statusCodeEquals(403);
    $this->drupalLogout();
  }
}
