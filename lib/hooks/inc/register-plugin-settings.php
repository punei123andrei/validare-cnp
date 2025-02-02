<?php
/**
 * Secure API Key Storage
 *
 * @package formular-validare
 * @author  Andrei Punei
 * @license GPL-2.0+
 */

namespace Validare\Blocks;


add_action( 'admin_init', __NAMESPACE__ . '\register_formular_setting' );
add_action( 'rest_api_init', __NAMESPACE__ . '\register_formular_setting' );
add_action( 'rest_api_init', __NAMESPACE__ . '\register_formular_rest_api' ); 
function register_formular_setting() {
	register_setting(
		'formular-blocks-settings',
		'formular-blocks-settings_data',
		array(
			'type'         => 'object',
			'default'      => array(
				'formular-api-key' => '',
			),
			'sanitize_callback' => __NAMESPACE__ . '\sanitize_api_key',
			'show_in_rest' => array(
				'schema' => array(
					'type'       => 'object',
					'properties' => array(
						'formular-api-key' => array(
							'type' => 'string',
						),
					),
				),
			),
		)
	);
}

/**
 * Sanitize API Key before storing it.
 */
function sanitize_api_key( $input ) {
	if ( isset( $input['formular-api-key'] ) ) {
		$input['formular-api-key'] = sanitize_text_field( $input['formular-api-key'] );
	}
	return $input;
}

/**
 * Register REST API endpoint for secure API key retrieval.
 */
function register_formular_rest_api() {
    error_log('REST API route registered'); // ✅ Debug log to check if it runs

    register_rest_route( 'formular-blocks/v1', '/settings/', array(
        'methods'             => 'GET',
        'callback'            => __NAMESPACE__ . '\get_api_key',
        'permission_callback' => function () {
            return current_user_can( 'manage_options' ); // Only admins can access
        },
    ) );
}


/**
 * Retrieve API key.
 */
function get_api_key( \WP_REST_Request $request ) {
    // Retrieve the stored data from WordPress options
    $data = get_option( 'formular-blocks-settings_data', array() );

    // Ensure it's array
    if (!is_array($data)) {
        $data = array();
    }

    // ✅ Extract only the API key (avoid returning entire settings)
    $api_key = isset($data['formular-api-key']) ? $data['formular-api-key'] : '';

    // ✅ Return JSON response
    return rest_ensure_response(array(
        'formular-api-key' => $api_key
    ));
}




