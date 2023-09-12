<?php
/**
 * Plugin Name:       Rockets Block
 * Description:       Custom React JS block that communicates with SpaceX API and renders a filterable dynamic grid of rockets.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       rockets-block
 * Domain path:		  /languages
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

class Rockets {
	function __construct() {
		add_action('init', array($this, 'languages'));
		add_action('init', array($this, 'register_spacex_rockets_endpoint'));

		add_action( 'init', array($this, 'create_block_rockets_block_block_init') );
		add_action( 'init', array($this, 'languages') );

		// add_action('wp_enqueue_scripts', array($this, 'enqueue_bootstrap'), 10);
		// add_action('wp_enqueue_scripts', array($this, 'enqueue_custom_styles'), 10);
		// add_action('enqueue_block_editor_assets', array($this, 'adminAssets'), 10);
	}
	
	function languages() {
		load_plugin_textdomain('rockets-block', false, dirname(plugin_basename(__FILE__)) . '/languages');
	}

	function create_block_rockets_block_block_init() {
		register_block_type(
			__DIR__ . '/build', 
			array(
				'render_callback' => array($this, 'create_block_rocket_render_callback'),
			)
		);
	}

	function create_block_rocket_render_callback() {
		wp_enqueue_script('create-block-rockets-block-view-script');

		ob_start();
		require plugin_dir_path(__FILE__) . 'src/template.php';
		return ob_get_clean();
	}

	function register_spacex_rockets_endpoint() {
		register_rest_route('custom-plugin/v1', '/spacex-rockets', array(
			'methods' => 'GET',
			'callback' => array($this, 'fetch_spacex_rockets_data')
			// 'permission_callback' => 'is_user_logged_in',
		));
	}

	function fetch_spacex_rockets_data() {
		$curl = curl_init();

		curl_setopt_array($curl, array(
		CURLOPT_URL => 'https://api.spacexdata.com/v4/rockets',
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 0,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_CUSTOMREQUEST => 'GET',
		));

		$response = curl_exec($curl);

		curl_close($curl);
		$data = json_decode($response);

		return wp_send_json($data);
	}

	// function enqueue_bootstrap() {
	// 	wp_enqueue_style( 'bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css' );
	// 	// wp_enqueue_style( 'bootstrap', 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css', array(), '4.3.1' );
	// 	wp_deregister_script( 'jquery' ); // Remove WP jQuery version
	// 	wp_enqueue_script( 'jquery', 'https://code.jquery.com/jquery-3.3.1.slim.min.js', array(), '3.3.1', true );
	// 	wp_enqueue_script( 'popper.js', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js', array(), '1.14.7', true );
	// 	wp_enqueue_script( 'bootstrap', 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js', array(), '4.3.1', true );
	// }

	// function enqueue_custom_styles() {
	// 	wp_enqueue_style('custom-plugin-styles', plugin_dir_url(__FILE__) . 'css/style.css', array(), '1.0.0');
	// }
}

$rockets = new Rockets();
