wp.blocks.registerBlockType("custom-plugin/my-own-gutenberg-block", {
	title: "Custom own Gutenberg Block",
	icon: "smiley",
	category: "common",
	attributes: {},
	edit: function () {
		return (
			<div>
				<h3>This is a JSX h3 elementttt</h3>
				<p>This is a paragraph - JSX 1</p>
			</div>
		)
	},
	save: function () {
		return (
			<div>
				<h5>This is a Rocket</h5>
			</div>
		)
	}
});