<?php
/**
 * @file
 * Default theme implementation to display a single Drupal page.
 *
 * Available variables:
 *
 * General utility variables:
 * - $base_path: The base URL path of the Drupal installation. At the very
 *   least, this will always default to /.
 * - $directory: The directory the template is located in, e.g. modules/system
 *   or themes/garland.
 * - $is_front: TRUE if the current page is the front page.
 * - $logged_in: TRUE if the user is registered and signed in.
 * - $is_admin: TRUE if the user has permission to main-menu administration pages.
 *
 * Site identity:
 * - $front_page: The URL of the front page. Use this instead of $base_path,
 *   when linking to the front page. This includes the language domain or
 *   prefix.
 * - $logo: The path to the logo image, as defined in theme configuration.
 * - $site_name: The name of the site, empty when display has been disabled
 *   in theme settings.
 * - $site_slogan: The slogan of the site, empty when display has been disabled
 *   in theme settings.
 *
 * Navigation:
 * - $main_menu (array): An array containing the Main menu links for the
 *   site, if they have been configured.
 * - $secondary_menu (array): An array containing the Secondary menu links for
 *   the site, if they have been configured.
 * - $breadcrumb: The breadcrumb trail for the current page.
 *
 * Page content (in order of occurrence in the default page.tpl.php):
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title: The page title, for use in the actual HTML content.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 * - $messages: HTML for status and error messages. Should be displayed
 *   prominently.
 * - $tabs (array): Tabs linking to any sub-pages beneath the current page
 *   (e.g., the view and edit tabs when displaying a node).
 * - $action_links (array): Actions local to the page, such as 'Add menu' on the
 *   menu administration interface.
 * - $feed_icons: A string of all feed icons for the current page.
 * - $node: The node object, if there is an automatically-loaded node
 *   associated with the page, and the node ID is the second argument
 *   in the page's path (e.g. node/12345 and node/12345/revisions, but not
 *   comment/reply/12345).
 *
 * Regions:
 * - $page['help']: Dynamic help text, mostly for admin pages.
 * - $page['content']: The main content of the current page.
 * - $page['sidebar_first']: Items for the first sidebar.
 * - $page['sidebar_second']: Items for the second sidebar.
 * - $page['header']: Items for the header region.
 * - $page['footer']: Items for the footer region.
 *
 * @see template_preprocess()
 * @see template_preprocess_page()
 * @see template_process()
 */
?>

<div class="container">
    <div class="header">
        <a class="logo" href="/"><img src="<? print $logo; ?>" width="100%" height="100%" alt=""/></a>
        <img class="slogan" src="/<?=$directory?>/images/slogan.png" width="100%" height="100%" alt=""/>

        <form class="search">
            <input type="text" placeholder="поиск по сайту">
            <a class="search-submit"></a>
        </form>
    </div>

<?php 
    $main_menu_tree = menu_tree(variable_get('menu_main_links_source', 'main-menu'));
?>

<ul class="main-nav">
<?    
    foreach( $main_menu_tree as $mItem )
    {        
        $title = @$mItem['#title'];
        $url = @$mItem['#href'];
        $url = '/?q='.$url;
        $below = @$mItem['#below'];
        if( !$title ) { continue; }
        echo '<li> <a class="'.($below?'sub':'').'" href="'.$url.'">'.$title.'</a>';
        
        if ( $below )
        {
            echo '<ul class="sub-nav">';
            
            foreach ( $below as $subItem )
            {
                $sub_title = @$subItem['#title'];
                $sub_url = @$subItem['#href'];
                $sub_desc = @$subItem['#localized_options']['attributes']['title'];
                $sub_url = '/?q='.$sub_url;
/*                
                echo '<pre>';
                print_r($subItem);
                echo '</pre>';
                
                switch( $subItem['#title'] )
                {
                    case 1:{ break;}
                    case 1:{ break;}
                    case 1:{ break;}
                    case 1:{ break;}
                }
*/
                if( $sub_title == '' ) continue;
                
                echo '
                <li>
                    <img src="images/pic5.png" width="121" height="85" alt=""/>
                    <p class="text">
                        <span>'.$sub_title.'</span>
                        '.$sub_desc.'
                    </p>
                    <a href="'.$sub_url.'">подробнее</a>
                    <div class="clear"></div>
                </li>
                ';
            }
            echo '</ul>';
        }
    }
?>
</ul>
    
<?php 
/*
  if ($main_menu):
    print theme(
      'links__system_main_menu', 
      array(
        'links' => $main_menu, 
        'attributes' => array(
          'class' => array('main-nav')
        )
      )
    );
    endif;
*/
?>   

<div class="content">
    <?php if ($is_front): ?>

    <? /* Short Link */
        $block = module_invoke('block','block_view','21'); //4
        print render( $block['content'] );
    ?>

    <?  /* Slider */
        $block = module_invoke('block','block_view','26'); //5
        print render( $block['content'] );
    ?> 

    <?  /* Konkurs */
        $block = module_invoke('block','block_view','16'); //3
        print render($block['content']);
    ?>
    
    <?php else : ?>
    
    <?
        if( arg(0) == 'node' && in_array( arg(1), array(36, 61, 66)) ) //2,11
        {
            include('page_product.tpl.php');
        }
        else
        {
    ?>

        <div class="page-title"><?= isset($node) ? $node->title:'' ?></div>
        <div class="page-content">
            <?php /*print isset($node) ? $node->body['und'][0]['value'] : ''; */?>
            <?php print render($page['content']); ?>
        </div>
        <div class="ads toRight">
        <?
            $block = module_invoke('block','block_view','6');
            print render($block['content']);
        ?>
        </div> 
        <? } ?>
    <?php endif; ?>
    
   
</div>
<div class="footer">
<?php
/*
$block = block_load('block', 1); // выводим блок с ID 1
$output = drupal_render(_block_get_renderable_array(_block_render_blocks(array($block))));
print $output;
*/
//        echo $page['footer']['block_1']['#markup'];

        $block = module_invoke('block','block_view','1');
        print render($block['content']);
     ?>
     </div>
    <div class="warningdiv">
<?
    $block = module_invoke('block','block_view','11');
    print render( $block['content'] );
?>
    </div>
    
    <?  /* Soc Icons */
        $block = module_invoke('block','block_view','31');
        print render($block['content']);
    ?>
    
</div>
