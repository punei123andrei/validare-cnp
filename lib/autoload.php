<?php
/**
 * File autoloader
 *
 * @author  Andrei Pueni
 * @license GPL-2.0+
 */

 namespace CloudWeb\Blocks;

/**
 * Loads non admin files.
 *
 * @return void
 * @since 1.0.1
 *
 */
function load_files() {
	$filenames = array(
		'blocks/index.php',
		'hooks/index.php'
	);
	load_specified_files( $filenames );
}


/**
 * Load each of the specified files.
 *
 * @param array $filenames
 * @param string $folder_root
 *
 * @return void
 * @since 1.0.0
 *
 */
function load_specified_files( array $filenames, $folder_root = '' ) {
	$folder_root = $folder_root ?: VALIDARE_PLUGIN_DIR . '/lib/';

	foreach ( $filenames as $filename ) {
		include( $folder_root . $filename );
	}
}

load_files();