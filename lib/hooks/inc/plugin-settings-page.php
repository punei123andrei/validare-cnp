<?php 
/**
 * Secure API Key Storage
 *
 * @package formular-validare
 * @author  Andrei Punei
 * @license GPL-2.0+
 */

namespace Validare\Blocks;

/**
 * Add settings page for API Key.
 */
function add_formular_settings_page() {
	add_menu_page(
		'Formular Validare Settings',
		'Formular Settings',
		'manage_options',
		'formular-settings',
		__NAMESPACE__ . '\render_formular_settings_page',
		'dashicons-admin-generic',
		90
	);
}

/**
 * Render the settings page.
 */
function render_formular_settings_page() {
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'Formular Validare Settings', 'formular-validare' ); ?></h1>
		<form method="post" action="options.php">
			<?php
			settings_fields( 'formular-blocks-settings' );
			do_settings_sections( 'formular-blocks-settings' );

			$options = get_option( 'formular-blocks-settings_data', array() );
			$api_key = isset( $options['formular-api-key'] ) ? esc_attr( $options['formular-api-key'] ) : '';
			?>
			<table class="form-table">
				<tr>
					<th scope="row">
						<label for="formular-api-key"><?php esc_html_e( 'API Key', 'formular-validare' ); ?></label>
					</th>
					<td>
						<input type="text" id="formular-api-key" name="formular-blocks-settings_data[formular-api-key]" value="<?php echo $api_key; ?>" class="regular-text">
					</td>
				</tr>
			</table>
			<?php submit_button(); ?>
		</form>
	</div>
	<?php
}