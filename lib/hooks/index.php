<?php
/**
 *
 * Load the all plugin filters files.
 *
 * @package formular-validare;
 * @author  Andrei Punei
 * @license GPL-2.0+
 */

 namespace Validare\Blocks;

/**
 * Register the plugin settings securely.
 */
add_action( 'admin_init', __NAMESPACE__ . '\register_formular_setting' );
add_action( 'rest_api_init', __NAMESPACE__ . '\register_formular_setting' );
add_action( 'rest_api_init', __NAMESPACE__ . '\register_formular_rest_api' );
add_action( 'admin_menu', __NAMESPACE__ . '\add_formular_settings_page' );


/**
 * Block Assets.
 */
add_action('wp_enqueue_scripts', __NAMESPACE__ . '\form_localize_vars');

// Register settings for the rest api
 $inc_dir = __DIR__ . '/inc/';
 $files = glob($inc_dir . '*.php');
 
 foreach ( $files as $file ) {
     require_once $file;
 }