<?php

namespace Drupal\tfa_test_plugins\Plugin\TfaSetup;

use Drupal\Core\Form\FormStateInterface;
use Drupal\tfa\Plugin\TfaSetupInterface;

/**
 * Class TfaTestValidationPluginSetupPlugin
 *
 * @package Drupal\tfa_test_plugins
 *
 * @TfaSetup(
 *   id = "tfa_test_plugins_validation_setup",
 *   label = @Translation("TFA Test Validation Plugin Setup"),
 *   description = @Translation("TFA Test Validation Plugin Setup Plugin"),
 *   helpLinks = {},
 *   setupMessages = {}
 * )
 */
class TfaTestValidationPluginSetupPlugin implements TfaSetupInterface {

  /**
   * Get the setup form for the validation method.
   *
   * @param array $form
   *   The configuration form array.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The current state of the form.
   *
   * @return array
   *   Form API array.
   */
  public function getSetupForm(array $form, FormStateInterface $form_state) {
    return $form;
  }

  /**
   * Validate the setup data.
   *
   * @param array $form
   *   The configuration form array.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The current state of the form.
   */
  public function validateSetupForm(array $form, FormStateInterface $form_state) {
  }

  /**
   * Submit the setup form.
   *
   * @param array $form
   *   The configuration form array.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The current state of the form.
   *
   * @return bool
   *   TRUE if no errors occur when saving the data.
   */
  public function submitSetupForm(array $form, FormStateInterface $form_state) {
    return TRUE;
  }

  /**
   * Returns a list of links containing helpful information for plugin use.
   *
   * @return string[]
   *   An array containing help links for e.g., OTP generation.
   */
  public function getHelpLinks() {
    return [];
  }

  /**
   * Returns a list of messages for plugin step.
   *
   * @return string[]
   *   An array containing messages to be used during plugin setup.
   */
  public function getSetupMessages() {
    return [];
  }

  /**
   * Plugin overview page.
   *
   * @param array $params
   *   Parameters to setup the overview information.
   *
   * @return array
   *   The overview form.
   */
  public function getOverview($params) {
    return [];
  }
}
