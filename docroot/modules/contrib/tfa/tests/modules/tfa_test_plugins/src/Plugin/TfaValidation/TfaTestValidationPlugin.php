<?php

namespace Drupal\tfa_test_plugins\Plugin\TfaValidation;

use Drupal\Core\Form\FormStateInterface;
use Drupal\tfa\Plugin\TfaValidationInterface;

/**
 * Class TfaTestValidationPlugin
 *
 * @package Drupal\tfa_test_plugins
 *
 * @TfaValidation(
 *   id = "tfa_test_plugins_validation",
 *   label = @Translation("TFA Test Validation Plugin"),
 *   description = @Translation("TFA Test Validation Plugin"),
 *   fallbacks = { },
 *   isFallback = FALSE
 * )
 */
class TfaTestValidationPlugin implements TfaValidationInterface {

  /**
   * Get TFA process form from plugin.
   *
   * @param array $form
   *   The configuration form array.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The current state of the form.
   *
   * @return array
   *   Form API array.
   */
  public function getForm(array $form, FormStateInterface $form_state) {
    return $form;
  }

  /**
   * Validate form.
   *
   * @param array $form
   *   The configuration form array.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *   The current state of the form.
   *
   * @return bool
   *   Whether form passes validation or not
   */
  public function validateForm(array $form, FormStateInterface $form_state) {
    return TRUE;
  }

  /**
   * @param $config
   * @param $state
   *
   * @return array
   */
  public function buildConfigurationForm($config, $state) {
    return [];
  }

  /**
   * Get validation plugin fallbacks.
   *
   * @return string[]
   *   Returns a list of fallback methods available for the current validation
   */
  public function getFallbacks() {
    return [];
  }

  /**
   * Is the validation plugin a fallback?
   *
   * If the plugin is a fallback we remove it from the validation
   * plugins list and show it only in the fallbacks list.
   *
   * @return bool
   *   TRUE if plugin is a fallback otherwise FALSE
   */
  public function isFallback() {
    return FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public function ready() {
    return TRUE;
  }

}
