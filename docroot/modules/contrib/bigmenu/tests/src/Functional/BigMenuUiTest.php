<?php

namespace Drupal\Tests\bigmenu\Functional;

use Drupal\menu_link_content\Entity\MenuLinkContent;
use Drupal\system\Entity\Menu;
use Drupal\Tests\BrowserTestBase;

/**
 * Tests the Big Menu interface.
 *
 * @group bigmenu
 */
class BigMenuUiTest extends BrowserTestBase {

  /**
   * A user with administration rights.
   *
   * @var \Drupal\user\UserInterface
   */
  protected $adminUser;

  /**
   * A test menu.
   *
   * @var \Drupal\system\Entity\Menu
   */
  protected $menu;

  /**
   * {@inheritdoc}
   */
  protected static $modules = [
    'bigmenu',
    'menu_link_content',
    'menu_ui',
  ];

  /**
   * {@inheritdoc}
   */
  public function setUp() {
    parent::setUp();

    $this->adminUser = $this->drupalCreateUser(['access administration pages', 'administer menu']);
    $this->menu = Menu::load('main');
  }

  /**
   * Tests the Big Menu interface.
   */
  public function testBigMenuUi() {
    $this->drupalLogin($this->adminUser);

    // Add new menu items in a hierarchy.
    $item1 = MenuLinkContent::create([
      'title' => 'Item 1',
      'link' => [['uri' => 'internal:/']],
      'menu_name' => 'main',
    ]);
    $item1->save();
    $item1_1 = MenuLinkContent::create([
      'title' => 'Item 1 - 1',
      'link' => [['uri' => 'internal:/']],
      'menu_name' => 'main',
      'parent' => 'menu_link_content:' . $item1->uuid(),
    ]);
    $item1_1->save();
    $item1_1_1 = MenuLinkContent::create([
      'title' => 'Item 1 - 1 - 1',
      'link' => [['uri' => 'internal:/']],
      'menu_name' => 'main',
      'parent' => 'menu_link_content:' . $item1_1->uuid(),
    ]);
    $item1_1_1->save();

    $item2 = MenuLinkContent::create([
      'title' => 'Item 2 (with disabled children)',
      'link' => [['uri' => 'internal:/']],
      'menu_name' => 'main',
    ]);
    $item2->save();
    $item2_1 = MenuLinkContent::create([
      'title' => 'Item 2 - 1 (disabled)',
      'link' => [['uri' => 'internal:/']],
      'menu_name' => 'main',
      'parent' => 'menu_link_content:' . $item2->uuid(),
      'enabled' => FALSE,
    ]);
    $item2_1->save();

    $this->drupalGet('admin/structure/menu/manage/main');
    $this->assertLinkExists('#menu-overview', 'Item 1');
    $this->assertLinkNotExists('#menu-overview', 'Item 1 - 1');
    $this->assertLinkNotExists('#menu-overview', 'Item 1 - 1 - 1');
    $this->assertSession()->elementNotExists('css', '.breadcrumb');

    // Check 'Edit child items' is available for 'Item 1'.
    $href = $this->menu->toUrl('edit-form', [
      'query' => ['menu_link' => 'menu_link_content:' . $item1->uuid()],
    ])->toString();
    $this->assertSession()->linkByHrefExists($href);

    // Check 'Edit child items' is available when all children are not enabled.
    $href = $this->menu->toUrl('edit-form', [
      'query' => ['menu_link' => 'menu_link_content:' . $item2->uuid()],
    ])->toString();
    $this->assertSession()->linkByHrefExists($href);

    $this->clickLink('Edit child items');
    $this->assertLinkExists('#menu-overview', 'Item 1');
    $this->assertLinkExists('#menu-overview', 'Item 1 - 1');
    $this->assertLinkNotExists('#menu-overview', 'Item 1 - 1 - 1');
    $this->assertLinkExists('.breadcrumb', 'Back to Main navigation top level');

    $this->clickLink('Edit child items');
    $this->assertLinkNotExists('#menu-overview', 'Item 1');
    $this->assertLinkExists('#menu-overview', 'Item 1 - 1');
    $this->assertLinkExists('#menu-overview', 'Item 1 - 1 - 1');
    $this->assertLinkExists('.breadcrumb', 'Back to Main navigation top level');
    $this->assertLinkExists('.breadcrumb', 'Item 1');

    // Test allowing more than one level of depth to appear.
    $this->config('bigmenu.settings')->set('max_depth', 2)->save();
    $this->drupalGet('admin/structure/menu/manage/main');
    $this->assertLinkExists('#menu-overview', 'Item 1');
    $this->assertLinkExists('#menu-overview', 'Item 1 - 1');
    $this->assertLinkNotExists('#menu-overview', 'Item 1 - 1 - 1');
  }

  /**
   * Assert a link doesn't exist, scoped to a container.
   *
   * @param string $container
   *   The container selector.
   * @param string $label
   *   The exact label of the link.
   */
  protected function assertLinkNotExists($container, $label) {
    $links = $this->getSession()->getPage()
      ->find('css', $container)
      ->findAll('named_exact', ['link', $label]);
    $this->assert(empty($links));
  }

  /**
   * Assert a link exist, scoped to a container.
   *
   * @param string $container
   *   The container selector.
   * @param string $label
   *   The exact label of the link.
   */
  protected function assertLinkExists($container, $label) {
    $links = $this->getSession()->getPage()
      ->find('css', $container)
      ->findAll('named_exact', ['link', $label]);
    $this->assert(!empty($links));
  }

}
