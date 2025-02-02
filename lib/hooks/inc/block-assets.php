<?php 
/**
 * Make nonce available
 *
 * @package formular-validare
 * @author  Andrei Punei
 * @license GPL-2.0+
 */

 namespace Validare\Blocks;

 function form_localize_vars() {

    // Pass nonce & REST URL
    wp_localize_script('form-form-cta-view-script', 'wpApiSettings', array(
        'root'  => esc_url_raw(rest_url()),
        'nonce' => wp_create_nonce('wp_rest'),
    ));
}
