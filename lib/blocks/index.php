<?php
/**
 *
 * Server Side rendering for Gutenberg blocks.
 *
 * @package cloudweb-blocks;
 * @license GPL-2.0+
 * @link    https://www.cloudweb.ch/
 */

namespace CloudWeb\Blocks;

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

 function block_init() {
    $build_dir = VALIDARE_PLUGIN_DIR . 'build/';
    
    if ( ! is_dir( $build_dir ) ) {
        return;
    }

    $block_dirs = array_filter( glob( $build_dir . '*' ), 'is_dir' );

    foreach ( $block_dirs as $block_dir ) {
        $block_json = $block_dir . '/block.json';
        
        if ( file_exists( $block_json ) ) {
            $block_data = json_decode( file_get_contents( $block_json ), true );

            if ( json_last_error() !== JSON_ERROR_NONE ) {
                continue;
            }

            $block_name = isset( $block_data['name'] ) ? $block_data['name'] : basename( $block_dir );

            $options = [];
            if ( isset( $block_data['render_callback'] ) ) {
                $callback_function = __NAMESPACE__ . '\\' . $block_data['render_callback'];
                if ( function_exists( $callback_function ) ) {
                    $options['render_callback'] = $callback_function;
                }
            }

            register_block_type( $block_dir, $options );
        }
    }
}
add_action( 'init', __NAMESPACE__ . '\block_init' );

// Include additional files
$inc_dir = __DIR__ . '/inc/';
$files = glob( $inc_dir . '*.php' );

foreach ( $files as $file ) {
    require_once $file;
}


