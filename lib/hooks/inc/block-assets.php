<?php 
/**
 * Make nonce available
 *
 * @package formular-validare
 * @author  Andrei Punei
 * @license GPL-2.0+
 */

 namespace Validare\Blocks;
 

 function cloudweb_enqueue_block_assets() {
    wp_enqueue_script('heyman', plugins_url('formular-validare/build//formular-validare/view.js'), array('wp-blocks', 'wp-element'), false, true);

    // Pass nonce & REST URL
    wp_localize_script('heyman', 'wpApiSettings', array(
        'root'  => esc_url_raw(rest_url()),
        'nonce' => wp_create_nonce('wp_rest'),
    ));
}

