<?php
/**
 * Plugin Name:       Formular Validare
 * Description:       Plugin de test pentru a valida un cnp.
 * Requires at least: 6.2.2
 * Requires PHP:      8.0
 * Version:           0.1.0
 * Author:            Andrei Punei
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       formular-validare
 *
 * @package           formularValidare
 */

namespace Validare\Blocks;

if (!function_exists('add_action')) {
	exit;
}

define('VALIDARE_PLUGIN_FILE', __FILE__);
define('VALIDARE_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('VALIDARE_PLUGIN_URL', plugin_dir_url(__FILE__));
define('VALIDARE_REST_NAMESPACE', 'validare/v1');
define('VALIDARE_SETTINGS', 'validare_setting');

$plugin_url = VALIDARE_PLUGIN_URL;

if (is_ssl()) {
	$plugin_url = str_replace('http://', 'https://', $plugin_url);
}

define('VALIDARE_SECURE_PLUGIN_URL', $plugin_url);

include_once ('lib/autoload.php');