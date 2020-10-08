// http://www.w3.org/wiki/CORS_Enabled
// https://code.google.com/p/html5security/wiki/CrossOriginRequestSecurity
/* global $: {} */

// JSON data created from XML on 24/6/2014

var navObj = '';

// ---------- GLOBAL VARIABLE ----------
// To minimize conflicts with other scripts, we store all data in a single global variable
var DIWUP = {};



// ---------- HELPER FUNCTIONS() ----------
// General functions necessary to create the navigation

DIWUP.count = function (el) {
    var size = 0, key;
    for (key in el) {
        if (el.hasOwnProperty(key)) size++;
    }
    return size;
};

DIWUP.make_array = function (el) {
    if (el === undefined || el === null) {
        return [];
    } else if (typeof el === 'object' && el.length !== undefined)
        return el;
    else if (typeof el === 'object' && el.tagName !== undefined)
        return [el];
    else
        return [];
};

DIWUP.filter = function (els, tagname) {
    var arr = DIWUP.make_array(els);
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].nodeType == 3)
            continue;
        if (arr[i].tagName.toLowerCase() == tagname.toLowerCase())
            result.push(arr[i]);
    }
    return result;
};

DIWUP.children = function (parent, tagname) {
    var els = DIWUP.make_array(parent);
    var result = [];
    for (var i = 0; i < els.length; i++) {
        result = result.concat(DIWUP.filter(els[i].childNodes, tagname));
    }
    return result;
};

DIWUP.siblings = function (el, tagname) {
    var els = DIWUP.make_array(el);
    return DIWUP.children(els[0].parentNode, tagname);
};



// ---------- SET_TOGGLE() ----------
// For hiding and showing sections (used on the mobile navigation)

DIWUP.set_toggle = function (Link, Section, Sections, Container) {

    // Validate
    if (typeof Link.addEventListener !== 'function') return false;

    // Hide Sections
    for (var i = 0; i < Sections.length; i++) {
        Sections[i].style.display = 'block';
        Sections[i].style.overflow = 'hidden';
        Sections[i].style.height = 0;
        Sections[i].style.paddingTop = 0;
        Sections[i].style.paddingBottom = 0;
        Sections[i].style.transition = 'all .5s';
        Sections[i].style.webkitTransition = 'all .5s';
    }

    // Attach Function to Link
    Link.addEventListener('click', function (e) {

        // Set Vars
        var height = false;
        var i;
        var container_height = 0;
        var padding = 0;

        // Reset All
        for (i = 0; i < Sections.length; i++) {
            Sections[i].style.height = window.getComputedStyle(Sections[i]).height;
            Sections[i].style.transition = 'none';
            Sections[i].style.webkitTransition = 'none';
        }
        if (Container !== undefined) {
            Container.style.transition = 'none';
            Container.style.webkitTransition = 'none';
            Container.style.height = 'auto';
        }

        // Get Full Height
        if (parseInt(Section.style.height, 10) === 0) {
            Section.style.height = 'auto';
            Section.style.paddingTop = '';
            Section.style.paddingBottom = '';
            height = parseInt(window.getComputedStyle(Section).height) + parseInt(window.getComputedStyle(Section).paddingTop) + parseInt(window.getComputedStyle(Section).paddingBottom);
            height = height + 'px';
            Section.style.height = 0;
        }

        // Reset All
        for (i = 0; i < Sections.length; i++) {
            if (parseInt(Sections[i].style.height, 10) !== 0) {
                Sections[i].style.height = 0;
                Sections[i].style.paddingTop = 0;
                Sections[i].style.paddingBottom = 0;
            }
        }

        // Update Height
        if (height) {
            Section.style.height = height;
            Section.style.padding = '';
        }

        for (i = 0; i < Sections.length; i++) {
            Sections[i].style.transition = 'all .5s';
            Sections[i].style.webkitTransition = 'all .5s';
        }
        e.preventDefault();
    }, false);
};



// ---------- UPDATE() ----------
// Adjust styles for responsiveness that can't be achieved with just css

DIWUP.prevWindowW = 0;
DIWUP.prevObjectH = 0;
DIWUP.responsiveW = 700;

DIWUP.update = function () {
    var GlobNav = document.getElementById('global_nav');
    var GlobNavWrapper = DIWUP.children(GlobNav, 'div')[0];
    var width = (window.innerWidth !== undefined) ? window.innerWidth : document.body.clientWidth;
    if (width > DIWUP.responsiveW) {
        // Desktop
        GlobNavWrapper.style.height = '';
        GlobNavWrapper.style.paddingTop = '';
        GlobNavWrapper.style.paddingBottom = '';
        GlobNavWrapper.style.overflow = 'visible';
        GlobNavWrapper.style.transition = '';
        GlobNavWrapper.style.webkitTransition = '';
    } else {
        // Mobile
        if (DIWUP.prevWindowW > DIWUP.responsiveW && DIWUP.prevObjectH < 1) {
            // Switch from desktop version
            GlobNavWrapper.style.height = 0;
            GlobNavWrapper.style.paddingTop = 0;
            GlobNavWrapper.style.paddingBottom = 0;
        }
        GlobNavWrapper.style.overflow = 'hidden';
        DIWUP.prevObjectH = parseInt(window.getComputedStyle(GlobNavWrapper).height, 10);
    }
    DIWUP.prevWindowW = width;
};



// ---------- INIT() ----------
// This function is only executed once, it reads the JSON object and creates a multilevel array based on the portals and sections

DIWUP.init = function () {

    // Create Navigation Tree
    var navigationTree = {};
    var allLinks = navObj.navigation.link;
    for (var i = 0; i < allLinks.length; i++) {

        // Get Links Information
        var thisLink = allLinks[i];
        var id = thisLink["-id"];
        var portal = thisLink["-portal"];
        var section = thisLink["-section"];
        var linkText = thisLink["-linkName"];
        var linkUrl = thisLink["-linkAddr"];
        var linkImg = thisLink["-linkImg"];
        var linkDesc = thisLink["-linkDesc"];

        // Check for Required fields
        if (portal === undefined || linkUrl === undefined)
            continue;

        // Create Portals
        if (navigationTree[portal] === undefined)
            navigationTree[portal] = {};

        // Add Portal Link
        if (!section) {
            if (navigationTree[portal].linkUrl === undefined)
                navigationTree[portal].linkUrl = linkUrl;
            continue;
        }

        // Create Sections
        if (navigationTree[portal][section] === undefined)
            navigationTree[portal][section] = [];

        // Add Section Link
        if (!linkText) {
            if (navigationTree[portal][section].linkUrl === undefined)
                navigationTree[portal][section].linkUrl = linkUrl;
            continue;
        }

        // Add Regular Links
        navigationTree[portal][section][i] = { text: linkText, url: linkUrl, img: linkImg, desc: linkDesc };
    }

    // Store tree in the global var
    DIWUP.NavTree = navigationTree;

    // IE Detection
    for (var ie = -1, b = document.createElement("b") ; b.innerHTML = "<!--[if gt IE " + ++ie + "]>1<![endif]-->", +b.innerHTML;);
    var html = document.getElementsByTagName('html')[0];
    if (ie == 9) html.className = html.className + ' ie9 lt-ie10';
    if (ie == 8) html.className = html.className + ' ie8 lt-ie9 lt-ie10';
    if (ie == 7) html.className = html.className + ' ie7 lt-ie8 lt-ie9 lt-ie10';
    if (ie > 0 && ie < 7) html.className = html.className + ' ie6 lt-ie7 lt-ie8 lt-ie9 lt-ie10';
    DIWUP.ie = ie;
    //console.log('end DIWUP.Init!');
};



// ---------- GET_SITEMAP() ----------
// Returns the sitemap as an html string, you can specify a custom id and class, and also choose to divide the navigation into columns

DIWUP.get_sitemap = function (id, class_name, columns) {

    // Set Defaults
    if (id === undefined) id = '';
    if (class_name === undefined) class_name = '';
    if (columns === undefined) columns = false;

    // Calculate columns
    var li_class = '';
    var li_style = '';
    var count;
    if (columns) {
        count = DIWUP.count(DIWUP.NavTree);
        var percentage = (99 - (count - 1) * 2) / count;
        li_class = 'col';
        li_style = 'width:' + percentage + '%';
    }

    // ----- LOOP PORTALS -----
    var Portals = DIWUP.NavTree;
    count = 0;
    var nav_output = '<ul id="' + id + '" class="level-1 dgn_cf ' + class_name + '">';
    for (var i in Portals) {
        if (Portals.hasOwnProperty(i)) {
            count++;
            var portal_link = (Portals[i].linkUrl !== undefined) ? Portals[i].linkUrl : '#'; // check if a link for this portal was specified
            var portal_li_class = 'level-1 ' + li_class + ' defence-nav-item-' + count; // create a custom class just for this portal
            nav_output += '<li class="' + portal_li_class + '" style="' + li_style + '">';
            nav_output += '<a class="level-1" href="' + portal_link + '"><span>' + i + '</span></a>';

            // ----- LOOP SECTIONS -----
            var Sections = Portals[i];
            nav_output += '<ul class="level-2">';

            if (id !== 'global_nav_sitemap') { // only render close button on the main nav, not the global nav flyout
                // add a li.level-2 and clear left for close button
                // add close button
                nav_output += '<li class="level-2 closeNav" style="width:auto;position: absolute;left: 94%;"><a href="#" onclick="DIWUP.closeNav(this);" class="" style="font-family: Helvetica, Arial, sans-serif;font-size:0.7em;font-weight:normal;z-index:100;background-color:#000000;margin-top:1em;"><div class="alignRight"><span class="closeButton">Close</span>&nbsp;<span class="icon-close"></span></div></a>';
            }

            for (var j in Sections) {
                if (Sections.hasOwnProperty(j)) {
                    if (j == 'linkUrl') continue; // Skip if this is just the Portal Link
                    var section_link = (Sections[j].linkUrl !== undefined) ? Sections[j].linkUrl : '#'; // check if a link for this section was specified
                    nav_output += '<li class="level-2"><a class="level-2" href="' + section_link + '">' + j + '</a>';

                    // ----- LOOP LINKS -----
                    var Links = Sections[j];
                    if (DIWUP.count(Links) < 1) continue; // Skip if it there are no links
                    nav_output += '<ul class="level-3">';
                    for (var k in Links) {
                        if (Links.hasOwnProperty(k)) {
                            if (k == 'linkUrl') continue; // Skip if this is just the Section Link
                            var Link = Links[k];
                            nav_output += '<li class="level-3"><a class="level-3" href="' + Link.url + '">' + Link.text + '</a></li>';
                        }
                    }
                    nav_output += '</ul>';
                    nav_output += '</li>';
                }
            }


            nav_output += '</ul>';

            nav_output += '</li>';
        }
    }
    nav_output += '</ul>';

    // Return
    return nav_output;

};



// ---------- SITEMAP() ----------
// Directly outputs the sitemap divided by columns

DIWUP.sitemap = function() {
    if (navObj === '') {
        //console.log('loading JSON');
        DIWUP.getNavJSON('DIWUP.sitemapDataCb');    
    }
    else
    {
        DIWUP.sitemapCb();  
    }
};

DIWUP.sitemapDataCb = function(data) {
    if(DIWUP.NavTree === undefined) {
        navObj = data;
        DIWUP.init();
        DIWUP.sitemapCb();
    }
    else
    {
        DIWUP.sitemapCb();  
    }
};

DIWUP.sitemapCb = function () {
    var sitemap = '';
    //sitemap += '<nav class="mainNav row" role="navigation">';
    sitemap += DIWUP.get_sitemap('', '', true);
    //sitemap += '</nav>';
    var siteMapEl = document.createElement('nav');
    siteMapEl.setAttribute('role', 'navigation');
    siteMapEl.className = 'mainNav row';
    siteMapEl.innerHTML = sitemap;
    var header = document.getElementsByTagName('header')[0];
    header.appendChild(siteMapEl);
    //document.write(sitemap);
    // wire up hover events for the sitemap except for IE8 and 7
    if (window.navigator.userAgent.indexOf('MSIE 7') == -1) {
        DIWUP.wireEvents();
    }
};



// ---------- NAVIGATION() ----------
// Outputs the whole global navigation
DIWUP.navigation = function( args, hidden ){
    // Set Defaults
    args = args || {};
    if( args.responsive===undefined )   args.responsive = false;
    if( args.responsive>100 )           DIWUP.responsiveW = args.responsive;
    if( args.search===undefined )       args.search = 'http://search.defence.gov.au/search';
    if( args.colour===undefined )       args.colour = 'dark';
    if( args.flyout===undefined )       args.flyout = true;
    if( args.method===undefined )       args.method = 'get';
    if( args.var_name===undefined )     args.var_name = 'q';
    if( args.width===undefined )        args.width = false;
    if( args.mobileMenu===undefined )   args.mobileMenu = true;
    hidden = hidden || {};
    if( DIWUP.ie && DIWUP.ie<9 ) args.responsive = false;
    
    DIWUP.args = args;
    DIWUP.hidden = hidden;
    
    if (navObj === '') {
        DIWUP.getNavJSON('DIWUP.navigationDataCb'); 
    }
};

DIWUP.navigationDataCb = function (data) {
    navObj = data;
    if (DIWUP.NavTree === undefined)
        DIWUP.init();
    DIWUP.navigationCb(DIWUP.args,DIWUP.hidden);
};

DIWUP.navigationCb = function (args, hidden) {
    // Set Defaults
    args = args || {};
    if (args.responsive === undefined) args.responsive = false;
    if (args.responsive > 100) DIWUP.responsiveW = args.responsive;
    if (args.search === undefined) args.search = 'http://search.defence.gov.au/search';
    if (args.colour === undefined) args.colour = 'dark';
    if (args.flyout === undefined) args.flyout = true;
    if (args.method === undefined) args.method = 'get';
    if (args.var_name === undefined) args.var_name = 'q';
    if (args.width === undefined) args.width = false;
    if (args.mobileMenu === undefined) args.mobileMenu = true;
    hidden = hidden || {};
    if (DIWUP.ie && DIWUP.ie < 9) args.responsive = false;

    // ----- ADD STYLES AND CLASSES -----

    // Get Objects
    var Body = document.body;
    var Head = document.getElementsByTagName('head')[0];
    var Link = document.getElementById('defence_nav_styles');
    var output;

    // Load Styles
/*
    if (!Link) {
        Link = document.createElement('link');
        Link.rel = 'stylesheet';
        Link.type = 'text/css';
        Link.id = 'defence_nav_styles';
        Link.href = 'http://www.Defence.gov.au/_Master/GlobalNav/Global_Nav.css';
      
        Head.appendChild(Link);
    }
*/
    // Add Responsive Class
    if (args.responsive)
        Body.className = Body.className + ' responsive_global_nav ';


    // ----- CREATE BLOCKS -----

    // Sitemap Link
    var sitemap_link = '',
        sitemap_link_style = '';
    if (args.responsive) {
        if (!args.mobileMenu) {
            sitemap_link_style = ' !important';
        }
        sitemap_link = [
            '<div id="global_nav_sitemap_responsive_wrapper" style="display:none' + sitemap_link_style + '">',
                '<a href="#" class="mobile_only" id="global_nav_sitemap_responsive_toggle">Search</a>',
                DIWUP.get_sitemap('global_nav_sitemap_responsive'),
            '</div>'
        ].join('\n');
    }

    // Mobile Nav Toggle
    var mobile_nav_toggle = (args.responsive) ? '<a href="#" class="mobile_only" id="global_nav_toggle">Search</a>' : '';

    // Search Form
    var search_form = '';
    var hidden_fields = '';
    for (var i in hidden) {
        if (hidden.hasOwnProperty(i))
            hidden_fields += '<input type="hidden" name="' + i + '" value="' + hidden[i] + '" />';
    }
    if (args.search) {
        var qparam = '';
        var functions = ' onfocus="if(this.value==this.defaultValue)this.value=\'\'" onblur="if(this.value==\'\')this.value=this.defaultValue; this.form.action=\'/search/\' + this.value" ';
        search_form = [
            '<div id="global_nav_search">',
                '<form action="' + args.search + '" id="cse-search-box" method="' + args.method + '">',
                    '<fieldset>',
                        '<legend class="visuallyhidden" for="global_nav_search_input">Search form</legend>',
                        hidden_fields,
                        '<input type="hidden" name="client" value="default_frontend" />',
                        '<input type="text" id="global_nav_search_input" title="search" name="' + args.var_name + '" size="31" class="text" placeholder="Search Air Force" value="Search Air Force" ' + functions + ' />',
                        '<input type="submit" name="sa" value="Search" class="button" onclick="this.form.action=\'/search/\' + document.getElementById(\'global_nav_search_input\').value">',
                    '</fieldset>',
                '</form>',
            '</div>'
        ].join('\n');
    }

    // Flyout
    var flyout = '';
    var flyout_class = '';
    if (args.flyout) {


        flyout = DIWUP.get_sitemap('global_nav_sitemap', '', true);
        flyout_class = 'with_flyout';


    }

    // Government Crest
    var government_crest = '';
    if (args.responsive) {
        government_crest = [
            '<div id="global_nav_crest_wrapper" style="display:none">',
                '<a id="global_nav_crest" href="http://www.Defence.gov.au">Australian Goverment Department of Defence</a>',
            '</div>'
        ].join('\n');
    }


    // ----- PUT EVERYTHING TOGETHER AND OUTPUT -----
    output = '';//'<div class="dgn_cf" id="global_nav_main_wrapper">';
    var outputEl = document.createElement('div');
    outputEl.id = 'global_nav_main_wrapper';
    outputEl.className = 'dgn_cf';
    // Sitemap Link
    output += sitemap_link;

    // Search & Links
    var custom_width = (args.width) ? ' style="width:' + args.width + 'px" ' : '';
    output += [
        '<div id="global_nav" style="display:none" class="' + args.colour + '">',
            mobile_nav_toggle,
            '<div class="wrapper dgn_cf"' + custom_width + '>',
                '<div class="global_nav_wrapper dgn_cf">',
                    search_form,
                    '<ul id="global_nav_links" class="floatRight">',
                        '<li class="visuallyhidden focusable"><a href="#content">Skip to content</a></li>',
                        '<!--<li id="global_nav_help" class="mobile_hide"><a href="/Accessibility.asp">Help</a></li>-->',
                        '<li id="global_nav_home" class="' + flyout_class + '"><a href="http://defence.gov.au">Defence</a>',
                            flyout,
                        '</li>',
                        '<li id="global_nav_min"><a href="http://minister.defence.gov.au">Ministers</a></li>',
                        '<li id="global_nav_Navy"><a href="http://www.navy.gov.au">Navy</a></li>',
                        '<li id="global_nav_Army"><a href="http://www.army.gov.au">Army</a></li>',
                        '<li id="global_nav_RAAF"><a href="http://www.airforce.gov.au">Air Force</a></li>',
                    '</ul>',
                '</div>',
            '</div>',
        '</div>'
    ].join('\n');

    // Government Crest
    output += government_crest;

    //output+= '</div>';

    outputEl.innerHTML = output;
    document.body.insertBefore(outputEl, document.body.firstChild);


    // ----- ATTACH FUNCTIONS ON RESPONSIVE NAVIGATION -----
    if (args.responsive) {

        // Toggle Sections
        var Sitemap = document.getElementById('global_nav_sitemap_responsive');
        var Portals = DIWUP.children(Sitemap, 'li');
        var PortalLinks = DIWUP.children(Portals, 'a');
        var Sections = DIWUP.children(Portals, 'ul');

        for (var j = 0; j < PortalLinks.length; j++) {
            var portalLink = PortalLinks[j];
            var Section = DIWUP.siblings(portalLink, 'ul')[0];
            DIWUP.set_toggle(portalLink, Section, Sections, Sitemap);
        }

        // Toggle Sitemap and Search
        var SitemapLink = document.getElementById('global_nav_sitemap_responsive_toggle');
        var SearchLink = document.getElementById('global_nav_toggle');
        var Search = DIWUP.siblings(SearchLink, 'div')[0];
        var NavSections = [Sitemap, Search];

        DIWUP.set_toggle(SitemapLink, Sitemap, NavSections);
        DIWUP.set_toggle(SearchLink, Search, NavSections);

        // Responsive Styles
        if (typeof window.addEventListener === 'function')
            window.addEventListener('resize', DIWUP.update, false);
        DIWUP.update();
    }


};



// ---------- LIST SECTIONS() ----------
// Outputs a two-column list of sections inside a given portal
DIWUP.listSections = function(portal) {
    DIWUP.listSectionsArg = portal.replace(/&amp;/g,'&');
    if (navObj === '') {
        DIWUP.getNavJSON('DIWUP.listSectionsDataCb');   
    }
    else
    {
        DIWUP.listSectionsCb(DIWUP.listSectionsArg);    
    }
};

DIWUP.listSectionsDataCb = function(data) {
    if(DIWUP.NavTree === undefined) {
        navObj = data;
        DIWUP.init();
        DIWUP.listSectionsCb(DIWUP.listSectionsArg);
    }
    else
    {
        DIWUP.listSectionsCb(DIWUP.listSectionsArg);    
    }
};
DIWUP.listSectionsCb = function (portal) {

    // Set Variables
    var output = '';
    var Sections = DIWUP.NavTree[portal];
    var total = DIWUP.count(Sections);
    var count = 0;
    if (!total)
        return;

    // ----- LOOP SECTIONS -----
    //output += '<div class="row margin2">';
    var outputEl = document.createElement('div');
    outputEl.id = 'siteMap';
    output += '<div class="row margin2">';
    for (var i in Sections) {
        if (Sections.hasOwnProperty(i)) {
        
            if (i == 'linkUrl') continue; // Skip if this is just the Portal Link

            var section_link = i;
            if (Sections[i].linkUrl)
                section_link = '<a href="' + Sections[i].linkUrl + '">' + i + '</a>';

            output += '<div class="col span_4_of_4">';
            output += '<div class="whiteBox margin1">';
            output += '<div class="shadowRight">';
            output += '<header><a id="' + i + '"></a><h3 class="nomargin greyBox">' + i + '</h3></header>';

            // ----- LOOP LINKS -----
            var Links = Sections[i];
            if (DIWUP.count(Links) < 1) continue; // Skip if it there are no links
            for (var j in Links) {
                if (Links.hasOwnProperty(j)){
                    if (j == 'linkUrl') continue; // Skip if this is just the Section Link
                    var Link = Links[j];
                    var link_img = (Link.img !== undefined) ? '<div class="shadow"><img src="' + Link.img + '" alt="" class="scale"></div>' : '&nbsp;';

                    output += [
                        '<div class="row padding1">',
                            //'<div class="col span_1_of_3">',
        //                      link_img,
        //                  '</div>',
                            '<div class="col span_3_of_3">',
                                '<h4 class="nomargin"><a href="' + Link.url + '">' + Link.text + '</a></h4>',
                                Link.desc,
                            '</div>',
                        '</div>'
                    ].join('\n');
                }
            }

            output += '</div>';
            output += '</div>';
            output += '</div>';

            count++;
            if (count % 2 === 0) {
                output += '</div>';
                output += '<div class="row margin2">';
            }
        
    
            //output += '</div>';
            outputEl.innerHTML = output;
            // find the div with class row and content
            var elems = document.getElementsByTagName('div'), k, matchCount = 0, desiredMatch = 1, appended = false, elemToAppend;
            for (k in elems) {
                if (elems[k].className == 'row content') {
                    elemToAppend = elems[k];
                    if (matchCount == desiredMatch) {
                        elems[k].appendChild(outputEl);
                        appended = true;
                    }
                    matchCount++; // only get the second match
                }
            }
            // append to the first div with class row and content if we haven't already appended
            if (!appended && elemToAppend !== undefined) {
                elemToAppend.appendChild(outputEl);
                appended = true;
            }
        }
    }
    //document.body.appendChild(outputEl);
    //document.write(output);
};

// click event for closing main nav flyouts.
DIWUP.closeNav = function(elem) {
    $(elem).closest('li.level-1').children('a').removeClass('touched');
    $(elem).closest('li.level-1').find('.level-2').fadeOut();    
};

// ---------- INIT SCRIPT! ----------
function navInit(jsonData) {
    navObj = jsonData;
    DIWUP.init();
}
DIWUP.getNavJSON = function(cb) {
    var mn = document.createElement('script');
    mn.src = 'https://defencecd.govcms.gov.au/globalnav';
    mn.type = 'text/javascript';
    mn.async = 'true';
    var s = document.getElementsByTagName('head')[0];
    s.appendChild(mn);
};

DIWUP.wireEvents = function () {
    if( $('.mainNav li.level-1').length > 0 ) {

        var Items = $('.mainNav li.level-1'),
            Children = Items.children('ul');
        
        Items.click(function(e){
                var thisChild = $(this).children('ul');
                if (!e.target.href && e.target.nodeName.toLowerCase() == 'span' && e.target.parentNode.nodeName.toLowerCase() == 'a' && thisChild.is(":hidden")) {
                    /* if already visible, then navigate the link, otherwise make the submenus appear */
                    /* span tag inside an a tag */
                    Children.not( thisChild ).hide();
                    thisChild.toggle();
                    e.preventDefault();                 
                }
        });
    }
    
    
    
    // ----- EQUAL COLUMN HEIGHTS -----
    $('.mainNav a.level-1 span').equalHeight();
    $('.subsiteNav > ul > li > a').equalHeight();
    $('.callout').fixColumns('.col,.callout-link');
    
    // menu hover delay for main nav - also handling touch events
    var timer = null;
    $('.mainNav > ul >li').on('touchstart mouseenter',function(eventObj){
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        var menuItem = $(this);
        timer = setTimeout(function(eventObj){
            menuItem.find('.level-2').fadeIn({duration:300});
            menuItem.children('a').addClass('touched');

        },300);                       
    }).on('touchend mouseleave',function(eventObj){
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        $(this).find('.level-2').fadeOut({ duration: 300 });

        $(this).closest('.level-1>a').removeClass('touched');
        $(this).children('a').removeClass('touched');

    });
    
    var lastTouchEvent = '';
    // Global nav hover handling so touch events are also handled for flyouts
    $('#global_nav #global_nav_home').on('touchstart',function(eventObj){                                                                           
        var flyoutMenu = $(this).closest('li#global_nav_home').find('#global_nav_sitemap');
        if (lastTouchEvent === '') { eventObj.preventDefault(); }
        if (!flyoutMenu) { alert('flyout menu not found'); }
        if (flyoutMenu && flyoutMenu.css("height") == '1px') {
            /* if already visible, then navigate the link, otherwise make the submenus appear */
            /* span tag inside an a tag */
            eventObj.preventDefault();                  
        }
        else
        {
            if (!eventObj.target.href)
            {
                $(this).removeClass('hovered'); // close the flyout 
            }
            else
            {
                if (lastTouchEvent == 'touchstart') {
                    // if we've touched before, it means the flyout is active.
                    window.location.href = eventObj.target.href;        
                }
                else
                {
                    $(this).removeClass('hovered');
                }
            }
        }
        lastTouchEvent = eventObj.type;
        
    }).on('mouseenter mouseleave',function(eventObj){
        $(this).toggleClass('hovered'); 
    }).on('click',function(eventObj){
        $(this).toggleClass('hovered');
    });
};
