<?php
// phpcs:disable WordPress.Arrays.MultipleStatementAlignment.DoubleArrowNotAligned

if (!defined('ABSPATH')) {
	exit;
}

$settings = array(
	'enabled' => array(
		'title' => __('Enable/Disable', 'woocommerce'),
		'label' => 'Enable Vite Payments for Woocommerce',
		'type'  => 'checkbox',
		'description' => '',
		'default'     => 'no'
	),
	'title'        => array(
		'title'       => __('Title', 'woocommerce'),
		'type'        => 'text',
		'description' => __('This controls the title which the user sees during checkout.', 'vite_pay_for_woo'),
		'default'     => __('Vite and other tokens on the Vite protocol', 'vite'),
		'desc_tip'    => true,
	),
	'testmode'     => array(
		'title'       => __('Test Mode', 'vite_pay_for_woo'),
		'label'       => 'Enable Test Mode',
		'type'        => 'checkbox',
		'description' => 'Enable test mode on the Vite payment gateway using test address.',
		'default'     => 'yes',
		'desc_tip'    => true
	),
	'test_wallet_address' => array(
		'title'              => __('Test Wallet Address', 'vite_pay_for_woo'),
		'type'               => 'text',
		'default'            => 'vite_1e6fcaa6ade80cb29b981bc70b2e8396bbdfd70a04e6164705'
	),
	'live_wallet_address' => array(
		'title'              => __('Live Wallet Address', 'vite_pay_for_woo'),
		'type'               => 'text',
		'default'            => 'vite_1e6fcaa6ade80cb29b981bc70b2e8396bbdfd70a04e6164705'
	),
	'token_default' => array(
		'title' => __('Token Default', 'vite_pay_for_woo'),
		'type'  => 'text',
		'default'     => 'tti_5649544520544f4b454e6e40'
	),
	'default_memo' => array(
		'title' => __('Default Memo', 'vite_pay_for_woo'),
		'type'  => 'text',
		'default'     => ''
	),
	'node_url' => array(
		'title'   => __('Live Node URL', 'vite_pay_for_woo'),
		'type'    => 'text',
		'default' => 'wss://buidl.vite.net/gvite/ws'
	),
	'http_url' => array(
		'title'   => __('Live HTTP URL', 'vite_pay_for_woo'),
		'type'    => 'text',
		'default' => 'http://buidl.vite.net/gvite/http'
	),
	'test_node_url' => array(
		'title'        => __('Test Node URL', 'vite_pay_for_woo'),
		'type'         => 'text',
		'default'      => 'wss://buidl.vite.net/gvite/ws'
	),
	'test_http_url' => array(
		'title'        => __('Test HTTP URL', 'vite_pay_for_woo'),
		'type'         => 'text',
		'default'      => 'http://buidl.vite.net/gvite/http'
	),
	'payment_timeout' => array(
		'title'          => __('Payment Timeout', 'vite_pay_for_woo'),
		'type'           => 'text',
		'default'        => '900'
	),
	'qr_code_size'    => array(
		'title'        => __('QR Code Size', 'vite_pay_for_woo'),
		'type'         => 'text',
		'label'        => __('Desired QR code size in pixels', 'vite_pay_for_woo'),
		'default'      => '300'
	),
	'show_icons'    => array(
		'title'        => __('Show icons', 'vite_pay_for_woo'),
		'type'         => 'checkbox',
		'label'        => __('Display token icons on checkout page.', 'vite_pay_for_woo'),
		'default'      => 'yes'
	)
);

return apply_filters('vite_payments_for_woocommerce_checkout_settings', $settings);

// phpcs:enable
