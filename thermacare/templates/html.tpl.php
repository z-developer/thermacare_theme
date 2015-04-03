<!DOCTYPE html>
<head>
<?php print $head; ?>
<link href="themes/thermacare/css/thermacare.css" rel="stylesheet" type="text/css"/>

<script type="text/javascript" src="themes/thermacare/js/jquery-1.11.2.min.js"></script>
<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
<script type="text/javascript" src="themes/thermacare/js/jquery.mCustomScrollbar.concat.min.js"></script>
<script src="themes/thermacare/js/jquery.tools.min.js"></script>
<script src="themes/thermacare/js/main.js"></script>

<title><?php print $head_title; ?></title>
<?php print $styles; ?>
<?php print $scripts; ?>
<!--[if lt IE 9]><script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script><![endif]-->
</head>
<body class="<?php print $classes; ?>"<?php print $attributes; ?>>
  <?php print $page_top; ?>
  <?php print $page; ?>
  <?php print $page_bottom; ?>
</body>
</html>