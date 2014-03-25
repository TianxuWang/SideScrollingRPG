




<!DOCTYPE html>
<html>
  <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# object: http://ogp.me/ns/object# article: http://ogp.me/ns/article# profile: http://ogp.me/ns/profile#">
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    
    <title>ImpactJS-GUI/gui.js at master · datamosh/ImpactJS-GUI</title>
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub" />
    <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub" />
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-114.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-144.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144.png" />
    <meta property="fb:app_id" content="1401488693436528"/>

      <meta content="@github" name="twitter:site" /><meta content="summary" name="twitter:card" /><meta content="datamosh/ImpactJS-GUI" name="twitter:title" /><meta content="ImpactJS-GUI - Easy GUI for ImpactJS" name="twitter:description" /><meta content="https://2.gravatar.com/avatar/ddef7e80e4ad917d3b44c00ecf022b6d?d=https%3A%2F%2Fidenticons.github.com%2F483aee6318dd60d9fea437c8578e4572.png&amp;r=x&amp;s=400" name="twitter:image:src" />
<meta content="GitHub" property="og:site_name" /><meta content="object" property="og:type" /><meta content="https://2.gravatar.com/avatar/ddef7e80e4ad917d3b44c00ecf022b6d?d=https%3A%2F%2Fidenticons.github.com%2F483aee6318dd60d9fea437c8578e4572.png&amp;r=x&amp;s=400" property="og:image" /><meta content="datamosh/ImpactJS-GUI" property="og:title" /><meta content="https://github.com/datamosh/ImpactJS-GUI" property="og:url" /><meta content="ImpactJS-GUI - Easy GUI for ImpactJS" property="og:description" />

    <link rel="assets" href="https://github.global.ssl.fastly.net/">
    <link rel="conduit-xhr" href="https://ghconduit.com:25035/">
    <link rel="xhr-socket" href="/_sockets" />


    <meta name="msapplication-TileImage" content="/windows-tile.png" />
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="selected-link" value="repo_source" data-pjax-transient />
    <meta content="collector.githubapp.com" name="octolytics-host" /><meta content="collector-cdn.github.com" name="octolytics-script-host" /><meta content="github" name="octolytics-app-id" /><meta content="62E38A87:29A6:20C4BD:53265E4F" name="octolytics-dimension-request_id" /><meta content="4001998" name="octolytics-actor-id" /><meta content="TianxuWang" name="octolytics-actor-login" /><meta content="9d2a5117a477e5369590fbfa19dd65d8cfcb1aabe43ea66a7b57b1bb4bcf2a4e" name="octolytics-actor-hash" />
    

    
    
    <link rel="icon" type="image/x-icon" href="https://github.global.ssl.fastly.net/favicon.ico" />

    <meta content="authenticity_token" name="csrf-param" />
<meta content="pTAMTNTb83ZznyATlKL8e+L5cIQRXhFlrbn4J44IBbU=" name="csrf-token" />

    <link href="https://github.global.ssl.fastly.net/assets/github-b29e10add48f7766bbc64a11dfc772d8f3860636.css" media="all" rel="stylesheet" type="text/css" />
    <link href="https://github.global.ssl.fastly.net/assets/github2-38408e89653ef671f9e6bc74ffaf307a3ac02571.css" media="all" rel="stylesheet" type="text/css" />
    


      <script crossorigin="anonymous" src="https://github.global.ssl.fastly.net/assets/frameworks-55976bc637c425207bc6e52d7ac4c125773713de.js" type="text/javascript"></script>
      <script async="async" crossorigin="anonymous" src="https://github.global.ssl.fastly.net/assets/github-a2d1d75e0ca9e7a3074ef5f60daf8b98e3aee934.js" type="text/javascript"></script>
      
      <meta http-equiv="x-pjax-version" content="24da36cd9ef4013ffbb3b02a77428f32">

        <link data-pjax-transient rel='permalink' href='/datamosh/ImpactJS-GUI/blob/7aebdc5f6ebc9cb432af0cab4fb060743f0cb5f8/gui.js'>

  <meta name="description" content="ImpactJS-GUI - Easy GUI for ImpactJS" />

  <meta content="516681" name="octolytics-dimension-user_id" /><meta content="datamosh" name="octolytics-dimension-user_login" /><meta content="4448605" name="octolytics-dimension-repository_id" /><meta content="datamosh/ImpactJS-GUI" name="octolytics-dimension-repository_nwo" /><meta content="true" name="octolytics-dimension-repository_public" /><meta content="false" name="octolytics-dimension-repository_is_fork" /><meta content="4448605" name="octolytics-dimension-repository_network_root_id" /><meta content="datamosh/ImpactJS-GUI" name="octolytics-dimension-repository_network_root_nwo" />
  <link href="https://github.com/datamosh/ImpactJS-GUI/commits/master.atom" rel="alternate" title="Recent Commits to ImpactJS-GUI:master" type="application/atom+xml" />

  </head>


  <body class="logged_in  env-production windows vis-public page-blob">
    <a href="#start-of-content" class="accessibility-aid js-skip-to-content">Skip to content</a>
    <div class="wrapper">
      
      
      
      


      <div class="header header-logged-in true">
  <div class="container clearfix">

    <a class="header-logo-invertocat" href="https://github.com/">
  <span class="mega-octicon octicon-mark-github"></span>
</a>

    
    <a href="/notifications" aria-label="You have no unread notifications" class="notification-indicator tooltipped tooltipped-s" data-gotokey="n">
        <span class="mail-status all-read"></span>
</a>

      <div class="command-bar js-command-bar  in-repository">
          <form accept-charset="UTF-8" action="/search" class="command-bar-form" id="top_search_form" method="get">

<input type="text" data-hotkey="/ s" name="q" id="js-command-bar-field" placeholder="Search or type a command" tabindex="1" autocapitalize="off"
    
    data-username="TianxuWang"
      data-repo="datamosh/ImpactJS-GUI"
      data-branch="master"
      data-sha="b379a86df5f59d734de965d25e26e90b948da6b7"
  >

    <input type="hidden" name="nwo" value="datamosh/ImpactJS-GUI" />

    <div class="select-menu js-menu-container js-select-menu search-context-select-menu">
      <span class="minibutton select-menu-button js-menu-target" role="button" aria-haspopup="true">
        <span class="js-select-button">This repository</span>
      </span>

      <div class="select-menu-modal-holder js-menu-content js-navigation-container" aria-hidden="true">
        <div class="select-menu-modal">

          <div class="select-menu-item js-navigation-item js-this-repository-navigation-item selected">
            <span class="select-menu-item-icon octicon octicon-check"></span>
            <input type="radio" class="js-search-this-repository" name="search_target" value="repository" checked="checked" />
            <div class="select-menu-item-text js-select-button-text">This repository</div>
          </div> <!-- /.select-menu-item -->

          <div class="select-menu-item js-navigation-item js-all-repositories-navigation-item">
            <span class="select-menu-item-icon octicon octicon-check"></span>
            <input type="radio" name="search_target" value="global" />
            <div class="select-menu-item-text js-select-button-text">All repositories</div>
          </div> <!-- /.select-menu-item -->

        </div>
      </div>
    </div>

  <span class="help tooltipped tooltipped-s" aria-label="Show command bar help">
    <span class="octicon octicon-question"></span>
  </span>


  <input type="hidden" name="ref" value="cmdform">

</form>
        <ul class="top-nav">
          <li class="explore"><a href="/explore">Explore</a></li>
            <li><a href="https://gist.github.com">Gist</a></li>
            <li><a href="/blog">Blog</a></li>
          <li><a href="https://help.github.com">Help</a></li>
        </ul>
      </div>

    


  <ul id="user-links">
    <li>
      <a href="/TianxuWang" class="name">
        <img alt="" class=" js-avatar" data-user="4001998" height="20" src="https://avatars1.githubusercontent.com/u/4001998?s=140" width="20" /> TianxuWang
      </a>
    </li>

    <li class="new-menu dropdown-toggle js-menu-container">
      <a href="#" class="js-menu-target tooltipped tooltipped-s" aria-label="Create new...">
        <span class="octicon octicon-plus"></span>
        <span class="dropdown-arrow"></span>
      </a>

      <div class="new-menu-content js-menu-content">
      </div>
    </li>

    <li>
      <a href="/settings/profile" id="account_settings"
        class="tooltipped tooltipped-s"
        aria-label="Account settings ">
        <span class="octicon octicon-tools"></span>
      </a>
    </li>
    <li>
      <a class="tooltipped tooltipped-s" href="/logout" data-method="post" id="logout" aria-label="Sign out">
        <span class="octicon octicon-log-out"></span>
      </a>
    </li>

  </ul>

<div class="js-new-dropdown-contents hidden">
  

<ul class="dropdown-menu">
  <li>
    <a href="/new"><span class="octicon octicon-repo-create"></span> New repository</a>
  </li>
  <li>
    <a href="/organizations/new"><span class="octicon octicon-organization"></span> New organization</a>
  </li>


    <li class="section-title">
      <span title="datamosh/ImpactJS-GUI">This repository</span>
    </li>
      <li>
        <a href="/datamosh/ImpactJS-GUI/issues/new"><span class="octicon octicon-issue-opened"></span> New issue</a>
      </li>
</ul>

</div>


    
  </div>
</div>

      

        



      <div id="start-of-content" class="accessibility-aid"></div>
          <div class="site" itemscope itemtype="http://schema.org/WebPage">
    
    <div class="pagehead repohead instapaper_ignore readability-menu">
      <div class="container">
        

<ul class="pagehead-actions">

    <li class="subscription">
      <form accept-charset="UTF-8" action="/notifications/subscribe" class="js-social-container" data-autosubmit="true" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="authenticity_token" type="hidden" value="pTAMTNTb83ZznyATlKL8e+L5cIQRXhFlrbn4J44IBbU=" /></div>  <input id="repository_id" name="repository_id" type="hidden" value="4448605" />

    <div class="select-menu js-menu-container js-select-menu">
      <a class="social-count js-social-count" href="/datamosh/ImpactJS-GUI/watchers">
        8
      </a>
      <span class="minibutton select-menu-button with-count js-menu-target" role="button" tabindex="0" aria-haspopup="true">
        <span class="js-select-button">
          <span class="octicon octicon-eye-watch"></span>
          Watch
        </span>
      </span>

      <div class="select-menu-modal-holder">
        <div class="select-menu-modal subscription-menu-modal js-menu-content" aria-hidden="true">
          <div class="select-menu-header">
            <span class="select-menu-title">Notification status</span>
            <span class="octicon octicon-remove-close js-menu-close"></span>
          </div> <!-- /.select-menu-header -->

          <div class="select-menu-list js-navigation-container" role="menu">

            <div class="select-menu-item js-navigation-item selected" role="menuitem" tabindex="0">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <div class="select-menu-item-text">
                <input checked="checked" id="do_included" name="do" type="radio" value="included" />
                <h4>Not watching</h4>
                <span class="description">You only receive notifications for conversations in which you participate or are @mentioned.</span>
                <span class="js-select-button-text hidden-select-button-text">
                  <span class="octicon octicon-eye-watch"></span>
                  Watch
                </span>
              </div>
            </div> <!-- /.select-menu-item -->

            <div class="select-menu-item js-navigation-item " role="menuitem" tabindex="0">
              <span class="select-menu-item-icon octicon octicon octicon-check"></span>
              <div class="select-menu-item-text">
                <input id="do_subscribed" name="do" type="radio" value="subscribed" />
                <h4>Watching</h4>
                <span class="description">You receive notifications for all conversations in this repository.</span>
                <span class="js-select-button-text hidden-select-button-text">
                  <span class="octicon octicon-eye-unwatch"></span>
                  Unwatch
                </span>
              </div>
            </div> <!-- /.select-menu-item -->

            <div class="select-menu-item js-navigation-item " role="menuitem" tabindex="0">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <div class="select-menu-item-text">
                <input id="do_ignore" name="do" type="radio" value="ignore" />
                <h4>Ignoring</h4>
                <span class="description">You do not receive any notifications for conversations in this repository.</span>
                <span class="js-select-button-text hidden-select-button-text">
                  <span class="octicon octicon-mute"></span>
                  Stop ignoring
                </span>
              </div>
            </div> <!-- /.select-menu-item -->

          </div> <!-- /.select-menu-list -->

        </div> <!-- /.select-menu-modal -->
      </div> <!-- /.select-menu-modal-holder -->
    </div> <!-- /.select-menu -->

</form>
    </li>

  <li>
  

  <div class="js-toggler-container js-social-container starring-container ">
    <a href="/datamosh/ImpactJS-GUI/unstar"
      class="minibutton with-count js-toggler-target star-button starred"
      aria-label="Unstar this repository" title="Unstar datamosh/ImpactJS-GUI" data-remote="true" data-method="post" rel="nofollow">
      <span class="octicon octicon-star-delete"></span><span class="text">Unstar</span>
    </a>

    <a href="/datamosh/ImpactJS-GUI/star"
      class="minibutton with-count js-toggler-target star-button unstarred"
      aria-label="Star this repository" title="Star datamosh/ImpactJS-GUI" data-remote="true" data-method="post" rel="nofollow">
      <span class="octicon octicon-star"></span><span class="text">Star</span>
    </a>

      <a class="social-count js-social-count" href="/datamosh/ImpactJS-GUI/stargazers">
        45
      </a>
  </div>

  </li>


        <li>
          <a href="/datamosh/ImpactJS-GUI/fork" class="minibutton with-count js-toggler-target fork-button lighter tooltipped-n" title="Fork your own copy of datamosh/ImpactJS-GUI to your account" aria-label="Fork your own copy of datamosh/ImpactJS-GUI to your account" rel="nofollow" data-method="post">
            <span class="octicon octicon-git-branch-create"></span><span class="text">Fork</span>
          </a>
          <a href="/datamosh/ImpactJS-GUI/network" class="social-count">15</a>
        </li>


</ul>

        <h1 itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="entry-title public">
          <span class="repo-label"><span>public</span></span>
          <span class="mega-octicon octicon-repo"></span>
          <span class="author">
            <a href="/datamosh" class="url fn" itemprop="url" rel="author"><span itemprop="title">datamosh</span></a>
          </span>
          <span class="repohead-name-divider">/</span>
          <strong><a href="/datamosh/ImpactJS-GUI" class="js-current-repository js-repo-home-link">ImpactJS-GUI</a></strong>

          <span class="page-context-loader">
            <img alt="Octocat-spinner-32" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
          </span>

        </h1>
      </div><!-- /.container -->
    </div><!-- /.repohead -->

    <div class="container">
      <div class="repository-with-sidebar repo-container new-discussion-timeline js-new-discussion-timeline  ">
        <div class="repository-sidebar clearfix">
            

<div class="sunken-menu vertical-right repo-nav js-repo-nav js-repository-container-pjax js-octicon-loaders">
  <div class="sunken-menu-contents">
    <ul class="sunken-menu-group">
      <li class="tooltipped tooltipped-w" aria-label="Code">
        <a href="/datamosh/ImpactJS-GUI" aria-label="Code" class="selected js-selected-navigation-item sunken-menu-item" data-gotokey="c" data-pjax="true" data-selected-links="repo_source repo_downloads repo_commits repo_tags repo_branches /datamosh/ImpactJS-GUI">
          <span class="octicon octicon-code"></span> <span class="full-word">Code</span>
          <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

        <li class="tooltipped tooltipped-w" aria-label="Issues">
          <a href="/datamosh/ImpactJS-GUI/issues" aria-label="Issues" class="js-selected-navigation-item sunken-menu-item js-disable-pjax" data-gotokey="i" data-selected-links="repo_issues /datamosh/ImpactJS-GUI/issues">
            <span class="octicon octicon-issue-opened"></span> <span class="full-word">Issues</span>
            <span class='counter'>0</span>
            <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
</a>        </li>

      <li class="tooltipped tooltipped-w" aria-label="Pull Requests">
        <a href="/datamosh/ImpactJS-GUI/pulls" aria-label="Pull Requests" class="js-selected-navigation-item sunken-menu-item js-disable-pjax" data-gotokey="p" data-selected-links="repo_pulls /datamosh/ImpactJS-GUI/pulls">
            <span class="octicon octicon-git-pull-request"></span> <span class="full-word">Pull Requests</span>
            <span class='counter'>0</span>
            <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>


        <li class="tooltipped tooltipped-w" aria-label="Wiki">
          <a href="/datamosh/ImpactJS-GUI/wiki" aria-label="Wiki" class="js-selected-navigation-item sunken-menu-item" data-pjax="true" data-selected-links="repo_wiki /datamosh/ImpactJS-GUI/wiki">
            <span class="octicon octicon-book"></span> <span class="full-word">Wiki</span>
            <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
</a>        </li>
    </ul>
    <div class="sunken-menu-separator"></div>
    <ul class="sunken-menu-group">

      <li class="tooltipped tooltipped-w" aria-label="Pulse">
        <a href="/datamosh/ImpactJS-GUI/pulse" aria-label="Pulse" class="js-selected-navigation-item sunken-menu-item" data-pjax="true" data-selected-links="pulse /datamosh/ImpactJS-GUI/pulse">
          <span class="octicon octicon-pulse"></span> <span class="full-word">Pulse</span>
          <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

      <li class="tooltipped tooltipped-w" aria-label="Graphs">
        <a href="/datamosh/ImpactJS-GUI/graphs" aria-label="Graphs" class="js-selected-navigation-item sunken-menu-item" data-pjax="true" data-selected-links="repo_graphs repo_contributors /datamosh/ImpactJS-GUI/graphs">
          <span class="octicon octicon-graph"></span> <span class="full-word">Graphs</span>
          <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>

      <li class="tooltipped tooltipped-w" aria-label="Network">
        <a href="/datamosh/ImpactJS-GUI/network" aria-label="Network" class="js-selected-navigation-item sunken-menu-item js-disable-pjax" data-selected-links="repo_network /datamosh/ImpactJS-GUI/network">
          <span class="octicon octicon-git-branch"></span> <span class="full-word">Network</span>
          <img alt="Octocat-spinner-32" class="mini-loader" height="16" src="https://github.global.ssl.fastly.net/images/spinners/octocat-spinner-32.gif" width="16" />
</a>      </li>
    </ul>


  </div>
</div>

              <div class="only-with-full-nav">
                

  

<div class="clone-url open"
  data-protocol-type="http"
  data-url="/users/set_protocol?protocol_selector=http&amp;protocol_type=clone">
  <h3><strong>HTTPS</strong> clone URL</h3>
  <div class="clone-url-box">
    <input type="text" class="clone js-url-field"
           value="https://github.com/datamosh/ImpactJS-GUI.git" readonly="readonly">

    <span aria-label="copy to clipboard" class="js-zeroclipboard url-box-clippy minibutton zeroclipboard-button" data-clipboard-text="https://github.com/datamosh/ImpactJS-GUI.git" data-copied-hint="copied!"><span class="octicon octicon-clippy"></span></span>
  </div>
</div>

  

<div class="clone-url "
  data-protocol-type="ssh"
  data-url="/users/set_protocol?protocol_selector=ssh&amp;protocol_type=clone">
  <h3><strong>SSH</strong> clone URL</h3>
  <div class="clone-url-box">
    <input type="text" class="clone js-url-field"
           value="git@github.com:datamosh/ImpactJS-GUI.git" readonly="readonly">

    <span aria-label="copy to clipboard" class="js-zeroclipboard url-box-clippy minibutton zeroclipboard-button" data-clipboard-text="git@github.com:datamosh/ImpactJS-GUI.git" data-copied-hint="copied!"><span class="octicon octicon-clippy"></span></span>
  </div>
</div>

  

<div class="clone-url "
  data-protocol-type="subversion"
  data-url="/users/set_protocol?protocol_selector=subversion&amp;protocol_type=clone">
  <h3><strong>Subversion</strong> checkout URL</h3>
  <div class="clone-url-box">
    <input type="text" class="clone js-url-field"
           value="https://github.com/datamosh/ImpactJS-GUI" readonly="readonly">

    <span aria-label="copy to clipboard" class="js-zeroclipboard url-box-clippy minibutton zeroclipboard-button" data-clipboard-text="https://github.com/datamosh/ImpactJS-GUI" data-copied-hint="copied!"><span class="octicon octicon-clippy"></span></span>
  </div>
</div>


<p class="clone-options">You can clone with
      <a href="#" class="js-clone-selector" data-protocol="http">HTTPS</a>,
      <a href="#" class="js-clone-selector" data-protocol="ssh">SSH</a>,
      or <a href="#" class="js-clone-selector" data-protocol="subversion">Subversion</a>.
  <span class="help tooltipped tooltipped-n" aria-label="Get help on which URL is right for you.">
    <a href="https://help.github.com/articles/which-remote-url-should-i-use">
    <span class="octicon octicon-question"></span>
    </a>
  </span>
</p>


  <a href="github-windows://openRepo/https://github.com/datamosh/ImpactJS-GUI" class="minibutton sidebar-button" title="Save datamosh/ImpactJS-GUI to your computer and use it in GitHub Desktop." aria-label="Save datamosh/ImpactJS-GUI to your computer and use it in GitHub Desktop.">
    <span class="octicon octicon-device-desktop"></span>
    Clone in Desktop
  </a>

                <a href="/datamosh/ImpactJS-GUI/archive/master.zip"
                   class="minibutton sidebar-button"
                   aria-label="Download datamosh/ImpactJS-GUI as a zip file"
                   title="Download datamosh/ImpactJS-GUI as a zip file"
                   rel="nofollow">
                  <span class="octicon octicon-cloud-download"></span>
                  Download ZIP
                </a>
              </div>
        </div><!-- /.repository-sidebar -->

        <div id="js-repo-pjax-container" class="repository-content context-loader-container" data-pjax-container>
          


<!-- blob contrib key: blob_contributors:v21:6b13ba2df489241e64630a9972a1c54a -->

<p title="This is a placeholder element" class="js-history-link-replace hidden"></p>

<a href="/datamosh/ImpactJS-GUI/find/master" data-pjax data-hotkey="t" class="js-show-file-finder" style="display:none">Show File Finder</a>

<div class="file-navigation">
  

<div class="select-menu js-menu-container js-select-menu" >
  <span class="minibutton select-menu-button js-menu-target" data-hotkey="w"
    data-master-branch="master"
    data-ref="master"
    role="button" aria-label="Switch branches or tags" tabindex="0" aria-haspopup="true">
    <span class="octicon octicon-git-branch"></span>
    <i>branch:</i>
    <span class="js-select-button">master</span>
  </span>

  <div class="select-menu-modal-holder js-menu-content js-navigation-container" data-pjax aria-hidden="true">

    <div class="select-menu-modal">
      <div class="select-menu-header">
        <span class="select-menu-title">Switch branches/tags</span>
        <span class="octicon octicon-remove-close js-menu-close"></span>
      </div> <!-- /.select-menu-header -->

      <div class="select-menu-filters">
        <div class="select-menu-text-filter">
          <input type="text" aria-label="Filter branches/tags" id="context-commitish-filter-field" class="js-filterable-field js-navigation-enable" placeholder="Filter branches/tags">
        </div>
        <div class="select-menu-tabs">
          <ul>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="branches" class="js-select-menu-tab">Branches</a>
            </li>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="tags" class="js-select-menu-tab">Tags</a>
            </li>
          </ul>
        </div><!-- /.select-menu-tabs -->
      </div><!-- /.select-menu-filters -->

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="branches">

        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/datamosh/ImpactJS-GUI/blob/gh-pages/gui.js"
                 data-name="gh-pages"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="gh-pages">gh-pages</a>
            </div> <!-- /.select-menu-item -->
            <div class="select-menu-item js-navigation-item selected">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/datamosh/ImpactJS-GUI/blob/master/gui.js"
                 data-name="master"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text js-select-button-text css-truncate-target"
                 title="master">master</a>
            </div> <!-- /.select-menu-item -->
        </div>

          <div class="select-menu-no-results">Nothing to show</div>
      </div> <!-- /.select-menu-list -->

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="tags">
        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


        </div>

        <div class="select-menu-no-results">Nothing to show</div>
      </div> <!-- /.select-menu-list -->

    </div> <!-- /.select-menu-modal -->
  </div> <!-- /.select-menu-modal-holder -->
</div> <!-- /.select-menu -->

  <div class="breadcrumb">
    <span class='repo-root js-repo-root'><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/datamosh/ImpactJS-GUI" data-branch="master" data-direction="back" data-pjax="true" itemscope="url"><span itemprop="title">ImpactJS-GUI</span></a></span></span><span class="separator"> / </span><strong class="final-path">gui.js</strong> <span aria-label="copy to clipboard" class="js-zeroclipboard minibutton zeroclipboard-button" data-clipboard-text="gui.js" data-copied-hint="copied!"><span class="octicon octicon-clippy"></span></span>
  </div>
</div>


  <div class="commit file-history-tease">
    <img alt="doobinay" class="main-avatar js-avatar" data-user="2966535" height="24" src="https://0.gravatar.com/avatar/1946ed264c9bc0b7e1c896bec69420cd?d=https%3A%2F%2Fidenticons.github.com%2F9a9eea18681a79e45d364d6436481e52.png&amp;r=x&amp;s=140" width="24" />
    <span class="author"><a href="/doobinay" rel="author">doobinay</a></span>
    <time class="js-relative-date" data-title-format="YYYY-MM-DD HH:mm:ss" datetime="2013-03-12T11:10:36+01:00" title="2013-03-12 04:10:36">March 12, 2013</time>
    <div class="commit-title">
        <a href="/datamosh/ImpactJS-GUI/commit/c0dff37eb8e28a2110ff04815dfc1016aa858be4" class="message" data-pjax="true" title="Keybinds fixed">Keybinds fixed</a>
    </div>

    <div class="participation">
      <p class="quickstat"><a href="#blob_contributors_box" rel="facebox"><strong>3</strong> contributors</a></p>
          <a class="avatar tooltipped tooltipped-s" aria-label="pdcprod" href="/datamosh/ImpactJS-GUI/commits/master/gui.js?author=pdcprod"><img alt="Pablo Damian Cotoia" class=" js-avatar" data-user="2683850" height="20" src="https://0.gravatar.com/avatar/e2bbd7d8d6dce8c3a18fd192adef6111?d=https%3A%2F%2Fidenticons.github.com%2F111459807f605c1e5bb6eec8a5dab6f5.png&amp;r=x&amp;s=140" width="20" /></a>
    <a class="avatar tooltipped tooltipped-s" aria-label="doobinay" href="/datamosh/ImpactJS-GUI/commits/master/gui.js?author=doobinay"><img alt="doobinay" class=" js-avatar" data-user="2966535" height="20" src="https://0.gravatar.com/avatar/1946ed264c9bc0b7e1c896bec69420cd?d=https%3A%2F%2Fidenticons.github.com%2F9a9eea18681a79e45d364d6436481e52.png&amp;r=x&amp;s=140" width="20" /></a>
    <a class="avatar tooltipped tooltipped-s" aria-label="monobyte" href="/datamosh/ImpactJS-GUI/commits/master/gui.js?author=monobyte"><img alt="monobyte" class=" js-avatar" data-user="128296" height="20" src="https://2.gravatar.com/avatar/a54527233b4a788618d8b40f52f3a9e9?d=https%3A%2F%2Fidenticons.github.com%2Fb87b44cbc7bd6107c79d34fe67b0453f.png&amp;r=x&amp;s=140" width="20" /></a>


    </div>
    <div id="blob_contributors_box" style="display:none">
      <h2 class="facebox-header">Users who have contributed to this file</h2>
      <ul class="facebox-user-list">
          <li class="facebox-user-list-item">
            <img alt="Pablo Damian Cotoia" class=" js-avatar" data-user="2683850" height="24" src="https://0.gravatar.com/avatar/e2bbd7d8d6dce8c3a18fd192adef6111?d=https%3A%2F%2Fidenticons.github.com%2F111459807f605c1e5bb6eec8a5dab6f5.png&amp;r=x&amp;s=140" width="24" />
            <a href="/pdcprod">pdcprod</a>
          </li>
          <li class="facebox-user-list-item">
            <img alt="doobinay" class=" js-avatar" data-user="2966535" height="24" src="https://0.gravatar.com/avatar/1946ed264c9bc0b7e1c896bec69420cd?d=https%3A%2F%2Fidenticons.github.com%2F9a9eea18681a79e45d364d6436481e52.png&amp;r=x&amp;s=140" width="24" />
            <a href="/doobinay">doobinay</a>
          </li>
          <li class="facebox-user-list-item">
            <img alt="monobyte" class=" js-avatar" data-user="128296" height="24" src="https://2.gravatar.com/avatar/a54527233b4a788618d8b40f52f3a9e9?d=https%3A%2F%2Fidenticons.github.com%2Fb87b44cbc7bd6107c79d34fe67b0453f.png&amp;r=x&amp;s=140" width="24" />
            <a href="/monobyte">monobyte</a>
          </li>
      </ul>
    </div>
  </div>

<div class="file-box">
  <div class="file">
    <div class="meta clearfix">
      <div class="info file-name">
        <span class="icon"><b class="octicon octicon-file-text"></b></span>
        <span class="mode" title="File Mode">file</span>
        <span class="meta-divider"></span>
          <span>223 lines (203 sloc)</span>
          <span class="meta-divider"></span>
        <span>6.896 kb</span>
      </div>
      <div class="actions">
        <div class="button-group">
            <a class="minibutton tooltipped tooltipped-w"
               href="github-windows://openRepo/https://github.com/datamosh/ImpactJS-GUI?branch=master&amp;filepath=gui.js" aria-label="Open this file in GitHub for Windows">
                <span class="octicon octicon-device-desktop"></span> Open
            </a>
                <a class="minibutton tooltipped tooltipped-n js-update-url-with-hash"
                   aria-label="Clicking this button will automatically fork this project so you can edit the file"
                   href="/datamosh/ImpactJS-GUI/edit/master/gui.js"
                   data-method="post" rel="nofollow">Edit</a>
          <a href="/datamosh/ImpactJS-GUI/raw/master/gui.js" class="button minibutton " id="raw-url">Raw</a>
            <a href="/datamosh/ImpactJS-GUI/blame/master/gui.js" class="button minibutton js-update-url-with-hash">Blame</a>
          <a href="/datamosh/ImpactJS-GUI/commits/master/gui.js" class="button minibutton " rel="nofollow">History</a>
        </div><!-- /.button-group -->

            <a class="minibutton danger empty-icon tooltipped tooltipped-s"
               href="/datamosh/ImpactJS-GUI/delete/master/gui.js"
               aria-label="Fork this project and delete file"
               data-method="post" data-test-id="delete-blob-file" rel="nofollow">

          Delete
        </a>
      </div><!-- /.actions -->
    </div>
        <div class="blob-wrapper data type-javascript js-blob-data">
        <table class="file-code file-diff tab-size-8">
          <tr class="file-code-line">
            <td class="blob-line-nums">
              <span id="L1" rel="#L1">1</span>
<span id="L2" rel="#L2">2</span>
<span id="L3" rel="#L3">3</span>
<span id="L4" rel="#L4">4</span>
<span id="L5" rel="#L5">5</span>
<span id="L6" rel="#L6">6</span>
<span id="L7" rel="#L7">7</span>
<span id="L8" rel="#L8">8</span>
<span id="L9" rel="#L9">9</span>
<span id="L10" rel="#L10">10</span>
<span id="L11" rel="#L11">11</span>
<span id="L12" rel="#L12">12</span>
<span id="L13" rel="#L13">13</span>
<span id="L14" rel="#L14">14</span>
<span id="L15" rel="#L15">15</span>
<span id="L16" rel="#L16">16</span>
<span id="L17" rel="#L17">17</span>
<span id="L18" rel="#L18">18</span>
<span id="L19" rel="#L19">19</span>
<span id="L20" rel="#L20">20</span>
<span id="L21" rel="#L21">21</span>
<span id="L22" rel="#L22">22</span>
<span id="L23" rel="#L23">23</span>
<span id="L24" rel="#L24">24</span>
<span id="L25" rel="#L25">25</span>
<span id="L26" rel="#L26">26</span>
<span id="L27" rel="#L27">27</span>
<span id="L28" rel="#L28">28</span>
<span id="L29" rel="#L29">29</span>
<span id="L30" rel="#L30">30</span>
<span id="L31" rel="#L31">31</span>
<span id="L32" rel="#L32">32</span>
<span id="L33" rel="#L33">33</span>
<span id="L34" rel="#L34">34</span>
<span id="L35" rel="#L35">35</span>
<span id="L36" rel="#L36">36</span>
<span id="L37" rel="#L37">37</span>
<span id="L38" rel="#L38">38</span>
<span id="L39" rel="#L39">39</span>
<span id="L40" rel="#L40">40</span>
<span id="L41" rel="#L41">41</span>
<span id="L42" rel="#L42">42</span>
<span id="L43" rel="#L43">43</span>
<span id="L44" rel="#L44">44</span>
<span id="L45" rel="#L45">45</span>
<span id="L46" rel="#L46">46</span>
<span id="L47" rel="#L47">47</span>
<span id="L48" rel="#L48">48</span>
<span id="L49" rel="#L49">49</span>
<span id="L50" rel="#L50">50</span>
<span id="L51" rel="#L51">51</span>
<span id="L52" rel="#L52">52</span>
<span id="L53" rel="#L53">53</span>
<span id="L54" rel="#L54">54</span>
<span id="L55" rel="#L55">55</span>
<span id="L56" rel="#L56">56</span>
<span id="L57" rel="#L57">57</span>
<span id="L58" rel="#L58">58</span>
<span id="L59" rel="#L59">59</span>
<span id="L60" rel="#L60">60</span>
<span id="L61" rel="#L61">61</span>
<span id="L62" rel="#L62">62</span>
<span id="L63" rel="#L63">63</span>
<span id="L64" rel="#L64">64</span>
<span id="L65" rel="#L65">65</span>
<span id="L66" rel="#L66">66</span>
<span id="L67" rel="#L67">67</span>
<span id="L68" rel="#L68">68</span>
<span id="L69" rel="#L69">69</span>
<span id="L70" rel="#L70">70</span>
<span id="L71" rel="#L71">71</span>
<span id="L72" rel="#L72">72</span>
<span id="L73" rel="#L73">73</span>
<span id="L74" rel="#L74">74</span>
<span id="L75" rel="#L75">75</span>
<span id="L76" rel="#L76">76</span>
<span id="L77" rel="#L77">77</span>
<span id="L78" rel="#L78">78</span>
<span id="L79" rel="#L79">79</span>
<span id="L80" rel="#L80">80</span>
<span id="L81" rel="#L81">81</span>
<span id="L82" rel="#L82">82</span>
<span id="L83" rel="#L83">83</span>
<span id="L84" rel="#L84">84</span>
<span id="L85" rel="#L85">85</span>
<span id="L86" rel="#L86">86</span>
<span id="L87" rel="#L87">87</span>
<span id="L88" rel="#L88">88</span>
<span id="L89" rel="#L89">89</span>
<span id="L90" rel="#L90">90</span>
<span id="L91" rel="#L91">91</span>
<span id="L92" rel="#L92">92</span>
<span id="L93" rel="#L93">93</span>
<span id="L94" rel="#L94">94</span>
<span id="L95" rel="#L95">95</span>
<span id="L96" rel="#L96">96</span>
<span id="L97" rel="#L97">97</span>
<span id="L98" rel="#L98">98</span>
<span id="L99" rel="#L99">99</span>
<span id="L100" rel="#L100">100</span>
<span id="L101" rel="#L101">101</span>
<span id="L102" rel="#L102">102</span>
<span id="L103" rel="#L103">103</span>
<span id="L104" rel="#L104">104</span>
<span id="L105" rel="#L105">105</span>
<span id="L106" rel="#L106">106</span>
<span id="L107" rel="#L107">107</span>
<span id="L108" rel="#L108">108</span>
<span id="L109" rel="#L109">109</span>
<span id="L110" rel="#L110">110</span>
<span id="L111" rel="#L111">111</span>
<span id="L112" rel="#L112">112</span>
<span id="L113" rel="#L113">113</span>
<span id="L114" rel="#L114">114</span>
<span id="L115" rel="#L115">115</span>
<span id="L116" rel="#L116">116</span>
<span id="L117" rel="#L117">117</span>
<span id="L118" rel="#L118">118</span>
<span id="L119" rel="#L119">119</span>
<span id="L120" rel="#L120">120</span>
<span id="L121" rel="#L121">121</span>
<span id="L122" rel="#L122">122</span>
<span id="L123" rel="#L123">123</span>
<span id="L124" rel="#L124">124</span>
<span id="L125" rel="#L125">125</span>
<span id="L126" rel="#L126">126</span>
<span id="L127" rel="#L127">127</span>
<span id="L128" rel="#L128">128</span>
<span id="L129" rel="#L129">129</span>
<span id="L130" rel="#L130">130</span>
<span id="L131" rel="#L131">131</span>
<span id="L132" rel="#L132">132</span>
<span id="L133" rel="#L133">133</span>
<span id="L134" rel="#L134">134</span>
<span id="L135" rel="#L135">135</span>
<span id="L136" rel="#L136">136</span>
<span id="L137" rel="#L137">137</span>
<span id="L138" rel="#L138">138</span>
<span id="L139" rel="#L139">139</span>
<span id="L140" rel="#L140">140</span>
<span id="L141" rel="#L141">141</span>
<span id="L142" rel="#L142">142</span>
<span id="L143" rel="#L143">143</span>
<span id="L144" rel="#L144">144</span>
<span id="L145" rel="#L145">145</span>
<span id="L146" rel="#L146">146</span>
<span id="L147" rel="#L147">147</span>
<span id="L148" rel="#L148">148</span>
<span id="L149" rel="#L149">149</span>
<span id="L150" rel="#L150">150</span>
<span id="L151" rel="#L151">151</span>
<span id="L152" rel="#L152">152</span>
<span id="L153" rel="#L153">153</span>
<span id="L154" rel="#L154">154</span>
<span id="L155" rel="#L155">155</span>
<span id="L156" rel="#L156">156</span>
<span id="L157" rel="#L157">157</span>
<span id="L158" rel="#L158">158</span>
<span id="L159" rel="#L159">159</span>
<span id="L160" rel="#L160">160</span>
<span id="L161" rel="#L161">161</span>
<span id="L162" rel="#L162">162</span>
<span id="L163" rel="#L163">163</span>
<span id="L164" rel="#L164">164</span>
<span id="L165" rel="#L165">165</span>
<span id="L166" rel="#L166">166</span>
<span id="L167" rel="#L167">167</span>
<span id="L168" rel="#L168">168</span>
<span id="L169" rel="#L169">169</span>
<span id="L170" rel="#L170">170</span>
<span id="L171" rel="#L171">171</span>
<span id="L172" rel="#L172">172</span>
<span id="L173" rel="#L173">173</span>
<span id="L174" rel="#L174">174</span>
<span id="L175" rel="#L175">175</span>
<span id="L176" rel="#L176">176</span>
<span id="L177" rel="#L177">177</span>
<span id="L178" rel="#L178">178</span>
<span id="L179" rel="#L179">179</span>
<span id="L180" rel="#L180">180</span>
<span id="L181" rel="#L181">181</span>
<span id="L182" rel="#L182">182</span>
<span id="L183" rel="#L183">183</span>
<span id="L184" rel="#L184">184</span>
<span id="L185" rel="#L185">185</span>
<span id="L186" rel="#L186">186</span>
<span id="L187" rel="#L187">187</span>
<span id="L188" rel="#L188">188</span>
<span id="L189" rel="#L189">189</span>
<span id="L190" rel="#L190">190</span>
<span id="L191" rel="#L191">191</span>
<span id="L192" rel="#L192">192</span>
<span id="L193" rel="#L193">193</span>
<span id="L194" rel="#L194">194</span>
<span id="L195" rel="#L195">195</span>
<span id="L196" rel="#L196">196</span>
<span id="L197" rel="#L197">197</span>
<span id="L198" rel="#L198">198</span>
<span id="L199" rel="#L199">199</span>
<span id="L200" rel="#L200">200</span>
<span id="L201" rel="#L201">201</span>
<span id="L202" rel="#L202">202</span>
<span id="L203" rel="#L203">203</span>
<span id="L204" rel="#L204">204</span>
<span id="L205" rel="#L205">205</span>
<span id="L206" rel="#L206">206</span>
<span id="L207" rel="#L207">207</span>
<span id="L208" rel="#L208">208</span>
<span id="L209" rel="#L209">209</span>
<span id="L210" rel="#L210">210</span>
<span id="L211" rel="#L211">211</span>
<span id="L212" rel="#L212">212</span>
<span id="L213" rel="#L213">213</span>
<span id="L214" rel="#L214">214</span>
<span id="L215" rel="#L215">215</span>
<span id="L216" rel="#L216">216</span>
<span id="L217" rel="#L217">217</span>
<span id="L218" rel="#L218">218</span>
<span id="L219" rel="#L219">219</span>
<span id="L220" rel="#L220">220</span>
<span id="L221" rel="#L221">221</span>
<span id="L222" rel="#L222">222</span>

            </td>
            <td class="blob-line-code"><div class="code-body highlight"><pre><div class='line' id='LC1'><span class="nx">ig</span><span class="p">.</span><span class="nx">module</span><span class="p">(</span><span class="s1">&#39;plugins.gui&#39;</span><span class="p">)</span></div><div class='line' id='LC2'><span class="p">.</span><span class="nx">requires</span><span class="p">(</span></div><div class='line' id='LC3'>	<span class="s1">&#39;impact.game&#39;</span></div><div class='line' id='LC4'><span class="p">)</span></div><div class='line' id='LC5'><span class="p">.</span><span class="nx">defines</span><span class="p">(</span><span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC6'>	<span class="c1">// Create GUI container</span></div><div class='line' id='LC7'>	<span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span> <span class="o">=</span> <span class="p">{</span></div><div class='line' id='LC8'>		<span class="c1">// Configuration</span></div><div class='line' id='LC9'>		<span class="nx">show</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span></div><div class='line' id='LC10'>		<span class="nx">initialized</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC11'><br/></div><div class='line' id='LC12'>		<span class="c1">// Mouse and cursor</span></div><div class='line' id='LC13'>		<span class="nx">cursor</span><span class="o">:</span> <span class="p">{</span></div><div class='line' id='LC14'>			<span class="nx">pos</span><span class="o">:</span> <span class="p">{</span> <span class="nx">x</span><span class="o">:</span> <span class="mi">0</span><span class="p">,</span> <span class="nx">y</span><span class="o">:</span> <span class="mi">0</span> <span class="p">},</span></div><div class='line' id='LC15'>			<span class="nx">offset</span><span class="o">:</span> <span class="p">{</span> <span class="nx">x</span><span class="o">:</span> <span class="mi">0</span><span class="p">,</span> <span class="nx">y</span><span class="o">:</span> <span class="mi">0</span> <span class="p">},</span></div><div class='line' id='LC16'>			<span class="nx">image</span><span class="o">:</span> <span class="kc">null</span><span class="p">,</span></div><div class='line' id='LC17'><br/></div><div class='line' id='LC18'>			<span class="nx">set</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">image</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC19'>				<span class="k">this</span><span class="p">.</span><span class="nx">image</span> <span class="o">=</span> <span class="nx">image</span><span class="p">;</span></div><div class='line' id='LC20'>			<span class="p">},</span></div><div class='line' id='LC21'><br/></div><div class='line' id='LC22'>			<span class="nx">clear</span><span class="o">:</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC23'>				<span class="k">this</span><span class="p">.</span><span class="nx">image</span> <span class="o">=</span> <span class="kc">null</span><span class="p">;</span></div><div class='line' id='LC24'>			<span class="p">},</span></div><div class='line' id='LC25'><br/></div><div class='line' id='LC26'>			<span class="nx">draw</span><span class="o">:</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC27'>				<span class="k">if</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">image</span> <span class="o">!=</span> <span class="kc">null</span><span class="p">)</span></div><div class='line' id='LC28'>					<span class="k">this</span><span class="p">.</span><span class="nx">image</span><span class="p">.</span><span class="nx">draw</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">pos</span><span class="p">.</span><span class="nx">x</span> <span class="o">-</span> <span class="k">this</span><span class="p">.</span><span class="nx">offset</span><span class="p">.</span><span class="nx">x</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">pos</span><span class="p">.</span><span class="nx">y</span> <span class="o">-</span> <span class="k">this</span><span class="p">.</span><span class="nx">offset</span><span class="p">.</span><span class="nx">y</span><span class="p">);</span></div><div class='line' id='LC29'>				<span class="k">if</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">icon</span> <span class="o">!=</span> <span class="kc">null</span><span class="p">)</span></div><div class='line' id='LC30'>					<span class="k">this</span><span class="p">.</span><span class="nx">icon</span><span class="p">.</span><span class="nx">draw</span><span class="p">(</span><span class="k">this</span><span class="p">.</span><span class="nx">pos</span><span class="p">.</span><span class="nx">x</span> <span class="o">-</span> <span class="k">this</span><span class="p">.</span><span class="nx">offset</span><span class="p">.</span><span class="nx">x</span><span class="p">,</span> <span class="k">this</span><span class="p">.</span><span class="nx">pos</span><span class="p">.</span><span class="nx">y</span> <span class="o">-</span> <span class="k">this</span><span class="p">.</span><span class="nx">offset</span><span class="p">.</span><span class="nx">y</span><span class="p">);</span></div><div class='line' id='LC31'>			<span class="p">}</span></div><div class='line' id='LC32'>		<span class="p">},</span></div><div class='line' id='LC33'><br/></div><div class='line' id='LC34'>		<span class="c1">// Elements</span></div><div class='line' id='LC35'>		<span class="nx">elements</span><span class="o">:</span> <span class="p">[],</span></div><div class='line' id='LC36'>		<span class="nx">element</span><span class="o">:</span> <span class="p">{</span></div><div class='line' id='LC37'>			<span class="cm">/* Actions:</span></div><div class='line' id='LC38'><span class="cm">					getByName, name</span></div><div class='line' id='LC39'><span class="cm">					getByGroup, name</span></div><div class='line' id='LC40'><span class="cm">					show, name</span></div><div class='line' id='LC41'><span class="cm">					showGroup, name</span></div><div class='line' id='LC42'><span class="cm">					hide, name</span></div><div class='line' id='LC43'><span class="cm">					hideGroup, name</span></div><div class='line' id='LC44'><span class="cm">					toggle, name</span></div><div class='line' id='LC45'><span class="cm">					toggleGroup, name</span></div><div class='line' id='LC46'><span class="cm">					remove, name</span></div><div class='line' id='LC47'><span class="cm">					removeGroup, name</span></div><div class='line' id='LC48'><span class="cm">					enable, name</span></div><div class='line' id='LC49'><span class="cm">					enableGroup, name</span></div><div class='line' id='LC50'><span class="cm">					disable, name</span></div><div class='line' id='LC51'><span class="cm">					disableGroup, name</span></div><div class='line' id='LC52'><span class="cm">					disableAll</span></div><div class='line' id='LC53'><span class="cm">			*/</span></div><div class='line' id='LC54'>			<span class="nx">action</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">action</span><span class="p">,</span> <span class="nx">name</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC55'>				<span class="kd">var</span> <span class="nx">collection</span> <span class="o">=</span> <span class="p">[];</span></div><div class='line' id='LC56'>				<span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC57'>					<span class="c1">// getByName</span></div><div class='line' id='LC58'>					<span class="k">if</span><span class="p">(</span><span class="nx">action</span> <span class="o">==</span> <span class="s1">&#39;getByName&#39;</span> <span class="o">&amp;&amp;</span> <span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">name</span> <span class="o">==</span> <span class="nx">name</span><span class="p">)</span></div><div class='line' id='LC59'>						<span class="nx">collection</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">]);</span></div><div class='line' id='LC60'>					<span class="c1">// getByGroup</span></div><div class='line' id='LC61'>					<span class="k">if</span><span class="p">(</span><span class="nx">action</span> <span class="o">==</span> <span class="s1">&#39;getByGroup&#39;</span> <span class="o">&amp;&amp;</span> <span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">group</span> <span class="o">==</span> <span class="nx">name</span><span class="p">)</span></div><div class='line' id='LC62'>						<span class="nx">collection</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">]);</span></div><div class='line' id='LC63'>					<span class="c1">// show</span></div><div class='line' id='LC64'>					<span class="k">if</span><span class="p">(</span><span class="nx">action</span> <span class="o">==</span> <span class="s1">&#39;show&#39;</span> <span class="o">&amp;&amp;</span> <span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">name</span> <span class="o">==</span> <span class="nx">name</span><span class="p">)</span></div><div class='line' id='LC65'>						<span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">show</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span></div><div class='line' id='LC66'>					<span class="c1">// showGroup</span></div><div class='line' id='LC67'>					<span class="k">if</span><span class="p">(</span><span class="nx">action</span> <span class="o">==</span> <span class="s1">&#39;showGroup&#39;</span> <span class="o">&amp;&amp;</span> <span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">group</span> <span class="o">==</span> <span class="nx">name</span><span class="p">)</span></div><div class='line' id='LC68'>						<span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">show</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span></div><div class='line' id='LC69'>					<span class="c1">// hide</span></div><div class='line' id='LC70'>					<span class="k">if</span><span class="p">(</span><span class="nx">action</span> <span class="o">==</span> <span class="s1">&#39;hide&#39;</span> <span class="o">&amp;&amp;</span> <span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">name</span> <span class="o">==</span> <span class="nx">name</span><span class="p">)</span></div><div class='line' id='LC71'>						<span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">show</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span></div><div class='line' id='LC72'>					<span class="c1">// hideGroup</span></div><div class='line' id='LC73'>					<span class="k">if</span><span class="p">(</span><span class="nx">action</span> <span class="o">==</span> <span class="s1">&#39;hideGroup&#39;</span> <span class="o">&amp;&amp;</span> <span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">group</span> <span class="o">==</span> <span class="nx">name</span><span class="p">)</span></div><div class='line' id='LC74'>						<span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">show</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span></div><div class='line' id='LC75'>					<span class="c1">// toggle</span></div><div class='line' id='LC76'>					<span class="k">if</span><span class="p">(</span><span class="nx">action</span> <span class="o">==</span> <span class="s1">&#39;toggle&#39;</span> <span class="o">&amp;&amp;</span> <span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">name</span> <span class="o">==</span> <span class="nx">name</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC77'>						<span class="k">if</span> <span class="p">(</span><span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">show</span><span class="p">)</span></div><div class='line' id='LC78'>							<span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">show</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span></div><div class='line' id='LC79'>						<span class="k">else</span></div><div class='line' id='LC80'>							<span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">show</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span></div><div class='line' id='LC81'>					<span class="p">}</span></div><div class='line' id='LC82'>					<span class="c1">// toggleGroup</span></div><div class='line' id='LC83'>					<span class="k">if</span><span class="p">(</span><span class="nx">action</span> <span class="o">==</span> <span class="s1">&#39;toggleGroup&#39;</span> <span class="o">&amp;&amp;</span> <span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">group</span> <span class="o">==</span> <span class="nx">name</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC84'>						<span class="k">if</span> <span class="p">(</span><span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">show</span><span class="p">)</span></div><div class='line' id='LC85'>							<span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">show</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span></div><div class='line' id='LC86'>						<span class="k">else</span></div><div class='line' id='LC87'>							<span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">show</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span></div><div class='line' id='LC88'>					<span class="p">}</span></div><div class='line' id='LC89'>					<span class="c1">// remove</span></div><div class='line' id='LC90'>					<span class="k">if</span><span class="p">(</span><span class="nx">action</span> <span class="o">==</span> <span class="s1">&#39;remove&#39;</span> <span class="o">&amp;&amp;</span> <span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">name</span> <span class="o">==</span> <span class="nx">name</span><span class="p">)</span></div><div class='line' id='LC91'>						<span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">.</span><span class="nx">erase</span><span class="p">(</span><span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">]);</span></div><div class='line' id='LC92'>					<span class="c1">// removeGroup</span></div><div class='line' id='LC93'>					<span class="k">if</span><span class="p">(</span><span class="nx">action</span> <span class="o">==</span> <span class="s1">&#39;removeGroup&#39;</span> <span class="o">&amp;&amp;</span> <span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">group</span> <span class="o">==</span> <span class="nx">name</span><span class="p">)</span></div><div class='line' id='LC94'>						<span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">.</span><span class="nx">erase</span><span class="p">(</span><span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">]);</span></div><div class='line' id='LC95'>					<span class="c1">// enable</span></div><div class='line' id='LC96'>					<span class="k">if</span><span class="p">(</span><span class="nx">action</span> <span class="o">==</span> <span class="s1">&#39;enable&#39;</span> <span class="o">&amp;&amp;</span> <span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">name</span> <span class="o">==</span> <span class="nx">name</span><span class="p">)</span></div><div class='line' id='LC97'>						<span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">disable</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span></div><div class='line' id='LC98'>					<span class="c1">// enableGroup</span></div><div class='line' id='LC99'>					<span class="k">if</span><span class="p">(</span><span class="nx">action</span> <span class="o">==</span> <span class="s1">&#39;enableGroup&#39;</span> <span class="o">&amp;&amp;</span> <span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">group</span> <span class="o">==</span> <span class="nx">name</span><span class="p">)</span></div><div class='line' id='LC100'>						<span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">disable</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span></div><div class='line' id='LC101'>					<span class="c1">// disable</span></div><div class='line' id='LC102'>					<span class="k">if</span><span class="p">(</span><span class="nx">action</span> <span class="o">==</span> <span class="s1">&#39;disable&#39;</span> <span class="o">&amp;&amp;</span> <span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">name</span> <span class="o">==</span> <span class="nx">name</span><span class="p">)</span></div><div class='line' id='LC103'>						<span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">disable</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span></div><div class='line' id='LC104'>					<span class="c1">// disableGroup</span></div><div class='line' id='LC105'>					<span class="k">if</span><span class="p">(</span><span class="nx">action</span> <span class="o">==</span> <span class="s1">&#39;disableGroup&#39;</span> <span class="o">&amp;&amp;</span> <span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">group</span> <span class="o">==</span> <span class="nx">name</span><span class="p">)</span></div><div class='line' id='LC106'>						<span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">disable</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span></div><div class='line' id='LC107'>					<span class="c1">// disableAll</span></div><div class='line' id='LC108'>					<span class="k">if</span><span class="p">(</span><span class="nx">action</span> <span class="o">==</span> <span class="s1">&#39;disableAll&#39;</span><span class="p">)</span></div><div class='line' id='LC109'>						<span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">disable</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span></div><div class='line' id='LC110'>				<span class="p">}</span></div><div class='line' id='LC111'>				<span class="k">if</span><span class="p">(</span><span class="nx">collection</span><span class="p">.</span><span class="nx">length</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC112'>					<span class="k">if</span><span class="p">(</span><span class="nx">collection</span><span class="p">.</span><span class="nx">length</span> <span class="o">==</span> <span class="mi">1</span><span class="p">)</span> <span class="nx">collection</span> <span class="o">=</span> <span class="nx">collection</span><span class="p">[</span><span class="mi">0</span><span class="p">];</span></div><div class='line' id='LC113'>					<span class="k">return</span> <span class="nx">collection</span><span class="p">;</span></div><div class='line' id='LC114'>				<span class="p">}</span></div><div class='line' id='LC115'>			<span class="p">},</span></div><div class='line' id='LC116'><br/></div><div class='line' id='LC117'>			<span class="nx">add</span><span class="o">:</span> <span class="kd">function</span><span class="p">(</span><span class="nx">element</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC118'>				<span class="k">if</span><span class="p">(</span><span class="nx">element</span><span class="p">.</span><span class="nx">show</span> <span class="o">==</span> <span class="kc">undefined</span><span class="p">)</span> <span class="nx">element</span><span class="p">.</span><span class="nx">show</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span></div><div class='line' id='LC119'>				<span class="k">if</span><span class="p">(</span><span class="nx">element</span><span class="p">.</span><span class="nx">disabled</span> <span class="o">==</span> <span class="kc">undefined</span><span class="p">)</span> <span class="nx">element</span><span class="p">.</span><span class="nx">disabled</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span></div><div class='line' id='LC120'>				<span class="k">if</span><span class="p">(</span><span class="nx">element</span><span class="p">.</span><span class="nx">active</span> <span class="o">==</span> <span class="kc">undefined</span><span class="p">)</span> <span class="nx">element</span><span class="p">.</span><span class="nx">active</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span></div><div class='line' id='LC121'>				<span class="k">if</span><span class="p">(</span><span class="nx">element</span><span class="p">.</span><span class="nx">showTitle</span> <span class="o">==</span> <span class="kc">undefined</span> <span class="o">||</span> <span class="p">(</span><span class="nx">element</span><span class="p">.</span><span class="nx">font</span> <span class="o">==</span> <span class="kc">undefined</span><span class="p">))</span> <span class="nx">element</span><span class="p">.</span><span class="nx">showTitle</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span></div><div class='line' id='LC122'>				<span class="k">if</span><span class="p">(</span><span class="nx">element</span><span class="p">.</span><span class="nx">showBind</span> <span class="o">==</span> <span class="kc">undefined</span> <span class="o">||</span> <span class="p">(</span><span class="nx">element</span><span class="p">.</span><span class="nx">font</span> <span class="o">==</span> <span class="kc">undefined</span><span class="p">))</span> <span class="nx">element</span><span class="p">.</span><span class="nx">showBind</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span></div><div class='line' id='LC123'><br/></div><div class='line' id='LC124'>				<span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">.</span><span class="nx">push</span><span class="p">(</span><span class="nx">element</span><span class="p">);</span></div><div class='line' id='LC125'>			<span class="p">},</span></div><div class='line' id='LC126'><br/></div><div class='line' id='LC127'>			<span class="nx">draw</span><span class="o">:</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC128'>				<span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC129'>					<span class="kd">var</span> <span class="nx">element</span> <span class="o">=</span> <span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">],</span></div><div class='line' id='LC130'>						<span class="nx">state</span> <span class="o">=</span> <span class="s1">&#39;normal&#39;</span><span class="p">;</span></div><div class='line' id='LC131'><br/></div><div class='line' id='LC132'>					<span class="c1">// Check position &amp; state</span></div><div class='line' id='LC133'>					<span class="k">if</span><span class="p">(</span><span class="o">!</span><span class="nx">element</span><span class="p">.</span><span class="nx">show</span><span class="p">)</span> <span class="k">continue</span><span class="p">;</span></div><div class='line' id='LC134'>					<span class="k">if</span><span class="p">(</span><span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">cursor</span><span class="p">.</span><span class="nx">pos</span><span class="p">.</span><span class="nx">x</span> <span class="o">&gt;=</span> <span class="nx">element</span><span class="p">.</span><span class="nx">pos</span><span class="p">.</span><span class="nx">x</span> <span class="o">&amp;&amp;</span> <span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">cursor</span><span class="p">.</span><span class="nx">pos</span><span class="p">.</span><span class="nx">x</span> <span class="o">&lt;=</span> <span class="nx">element</span><span class="p">.</span><span class="nx">pos</span><span class="p">.</span><span class="nx">x</span> <span class="o">+</span> <span class="nx">element</span><span class="p">.</span><span class="nx">size</span><span class="p">.</span><span class="nx">x</span> <span class="o">&amp;&amp;</span></div><div class='line' id='LC135'>						<span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">cursor</span><span class="p">.</span><span class="nx">pos</span><span class="p">.</span><span class="nx">y</span> <span class="o">&gt;=</span> <span class="nx">element</span><span class="p">.</span><span class="nx">pos</span><span class="p">.</span><span class="nx">y</span> <span class="o">&amp;&amp;</span> <span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">cursor</span><span class="p">.</span><span class="nx">pos</span><span class="p">.</span><span class="nx">y</span> <span class="o">&lt;=</span> <span class="nx">element</span><span class="p">.</span><span class="nx">pos</span><span class="p">.</span><span class="nx">y</span> <span class="o">+</span> <span class="nx">element</span><span class="p">.</span><span class="nx">size</span><span class="p">.</span><span class="nx">y</span> <span class="o">&amp;&amp;</span></div><div class='line' id='LC136'>						<span class="o">!</span><span class="nx">element</span><span class="p">.</span><span class="nx">disabled</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC137'>						<span class="nx">state</span> <span class="o">=</span> <span class="s1">&#39;hover&#39;</span><span class="p">;</span></div><div class='line' id='LC138'>					<span class="p">}</span></div><div class='line' id='LC139'><br/></div><div class='line' id='LC140'>					<span class="c1">// Pressed by Mouse OR Keybind</span></div><div class='line' id='LC141'>					<span class="k">if</span><span class="p">((</span><span class="nx">state</span> <span class="o">==</span> <span class="s1">&#39;hover&#39;</span> <span class="o">&amp;&amp;</span> <span class="p">(</span><span class="nx">ig</span><span class="p">.</span><span class="nx">input</span><span class="p">.</span><span class="nx">state</span><span class="p">(</span><span class="s1">&#39;mouse1&#39;</span><span class="p">)</span> <span class="o">||</span> <span class="nx">ig</span><span class="p">.</span><span class="nx">input</span><span class="p">.</span><span class="nx">pressed</span><span class="p">(</span><span class="s1">&#39;mouse1&#39;</span><span class="p">)))</span> <span class="o">||</span> <span class="p">(</span><span class="nx">ig</span><span class="p">.</span><span class="nx">input</span><span class="p">.</span><span class="nx">pressed</span><span class="p">(</span><span class="nx">element</span><span class="p">.</span><span class="nx">keybind</span><span class="p">)))</span> <span class="p">{</span></div><div class='line' id='LC142'>						<span class="nx">state</span> <span class="o">=</span> <span class="s1">&#39;active&#39;</span><span class="p">;</span></div><div class='line' id='LC143'>						<span class="k">if</span><span class="p">(</span><span class="nx">ig</span><span class="p">.</span><span class="nx">input</span><span class="p">.</span><span class="nx">state</span><span class="p">(</span><span class="s1">&#39;mouse1&#39;</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="k">typeof</span> <span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">mouseDown</span> <span class="o">==</span> <span class="s1">&#39;function&#39;</span><span class="p">)</span></div><div class='line' id='LC144'>							<span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">mouseDown</span><span class="p">.</span><span class="nx">call</span><span class="p">(</span><span class="nx">element</span><span class="p">);</span></div><div class='line' id='LC145'>						<span class="k">if</span><span class="p">(</span><span class="nx">ig</span><span class="p">.</span><span class="nx">input</span><span class="p">.</span><span class="nx">pressed</span><span class="p">(</span><span class="s1">&#39;mouse1&#39;</span><span class="p">)</span> <span class="o">||</span> <span class="nx">ig</span><span class="p">.</span><span class="nx">input</span><span class="p">.</span><span class="nx">pressed</span><span class="p">(</span><span class="nx">element</span><span class="p">.</span><span class="nx">keybind</span><span class="p">))</span> <span class="p">{</span></div><div class='line' id='LC146'>							<span class="c1">// Toggle (click)</span></div><div class='line' id='LC147'>							<span class="k">if</span><span class="p">(</span><span class="nx">element</span><span class="p">.</span><span class="nx">toggle</span><span class="p">)</span></div><div class='line' id='LC148'>								<span class="nx">element</span><span class="p">.</span><span class="nx">active</span> <span class="o">=</span> <span class="o">!</span><span class="nx">element</span><span class="p">.</span><span class="nx">active</span><span class="p">;</span></div><div class='line' id='LC149'>							<span class="c1">// Click function</span></div><div class='line' id='LC150'>							<span class="k">if</span><span class="p">(</span><span class="k">typeof</span> <span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">click</span> <span class="o">==</span> <span class="s1">&#39;function&#39;</span><span class="p">)</span></div><div class='line' id='LC151'>								<span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">click</span><span class="p">.</span><span class="nx">call</span><span class="p">(</span><span class="nx">element</span><span class="p">);</span></div><div class='line' id='LC152'>						<span class="p">}</span></div><div class='line' id='LC153'>					<span class="p">}</span></div><div class='line' id='LC154'><br/></div><div class='line' id='LC155'>					<span class="c1">// Toggle (state)</span></div><div class='line' id='LC156'>					<span class="k">if</span><span class="p">(</span><span class="nx">element</span><span class="p">.</span><span class="nx">toggle</span> <span class="o">&amp;&amp;</span> <span class="nx">element</span><span class="p">.</span><span class="nx">active</span><span class="p">)</span></div><div class='line' id='LC157'>						<span class="nx">state</span> <span class="o">=</span> <span class="s1">&#39;active&#39;</span><span class="p">;</span></div><div class='line' id='LC158'><br/></div><div class='line' id='LC159'>					<span class="c1">// Default state</span></div><div class='line' id='LC160'>					<span class="k">if</span><span class="p">(</span><span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">state</span><span class="p">[</span><span class="nx">state</span><span class="p">]</span> <span class="o">==</span> <span class="kc">undefined</span><span class="p">)</span></div><div class='line' id='LC161'>						<span class="nx">state</span> <span class="o">=</span> <span class="s1">&#39;normal&#39;</span><span class="p">;</span></div><div class='line' id='LC162'><br/></div><div class='line' id='LC163'>					<span class="c1">// Alpha</span></div><div class='line' id='LC164'>					<span class="k">if</span><span class="p">(</span><span class="nx">element</span><span class="p">.</span><span class="nx">alpha</span> <span class="o">!=</span> <span class="kc">undefined</span><span class="p">)</span></div><div class='line' id='LC165'>						<span class="nx">ig</span><span class="p">.</span><span class="nx">system</span><span class="p">.</span><span class="nx">context</span><span class="p">.</span><span class="nx">globalAlpha</span> <span class="o">=</span> <span class="nx">element</span><span class="p">.</span><span class="nx">alpha</span><span class="p">;</span></div><div class='line' id='LC166'><br/></div><div class='line' id='LC167'>					<span class="c1">// Image</span></div><div class='line' id='LC168'>					<span class="kd">var</span> <span class="nx">image</span> <span class="o">=</span> <span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">state</span><span class="p">[</span><span class="nx">state</span><span class="p">];</span></div><div class='line' id='LC169'>					<span class="k">if</span><span class="p">(</span><span class="nb">isNaN</span><span class="p">(</span><span class="nx">image</span><span class="p">.</span><span class="nx">tile</span><span class="p">)</span> <span class="o">||</span> <span class="nb">isNaN</span><span class="p">(</span><span class="nx">image</span><span class="p">.</span><span class="nx">tileSize</span><span class="p">))</span> <span class="p">{</span></div><div class='line' id='LC170'>						<span class="nx">image</span><span class="p">.</span><span class="nx">image</span><span class="p">.</span><span class="nx">draw</span><span class="p">(</span><span class="nx">element</span><span class="p">.</span><span class="nx">pos</span><span class="p">.</span><span class="nx">x</span><span class="p">,</span> <span class="nx">element</span><span class="p">.</span><span class="nx">pos</span><span class="p">.</span><span class="nx">y</span><span class="p">);</span></div><div class='line' id='LC171'>					<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC172'>						<span class="nx">image</span><span class="p">.</span><span class="nx">image</span><span class="p">.</span><span class="nx">drawTile</span><span class="p">(</span><span class="nx">element</span><span class="p">.</span><span class="nx">pos</span><span class="p">.</span><span class="nx">x</span><span class="p">,</span> <span class="nx">element</span><span class="p">.</span><span class="nx">pos</span><span class="p">.</span><span class="nx">y</span><span class="p">,</span> <span class="nx">image</span><span class="p">.</span><span class="nx">tile</span><span class="p">,</span> <span class="nx">image</span><span class="p">.</span><span class="nx">tileSize</span><span class="p">);</span></div><div class='line' id='LC173'>					<span class="p">}</span></div><div class='line' id='LC174'>					<span class="c1">// Icon</span></div><div class='line' id='LC175'>					<span class="kd">var</span> <span class="nx">icon</span> <span class="o">=</span> <span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">elements</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">icon</span><span class="p">;</span></div><div class='line' id='LC176'>					<span class="k">if</span> <span class="p">(</span><span class="nx">element</span><span class="p">.</span><span class="nx">icon</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC177'>						<span class="nx">icon</span><span class="p">.</span><span class="nx">draw</span><span class="p">(</span><span class="nx">element</span><span class="p">.</span><span class="nx">pos</span><span class="p">.</span><span class="nx">x</span><span class="p">,</span> <span class="nx">element</span><span class="p">.</span><span class="nx">pos</span><span class="p">.</span><span class="nx">y</span><span class="p">);</span></div><div class='line' id='LC178'>					<span class="p">}</span></div><div class='line' id='LC179'>					<span class="c1">// Show Bind</span></div><div class='line' id='LC180'>					<span class="k">if</span> <span class="p">(</span><span class="nx">element</span><span class="p">.</span><span class="nx">showBind</span> <span class="o">&amp;&amp;</span> <span class="nx">element</span><span class="p">.</span><span class="nx">font</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC181'>						<span class="nx">element</span><span class="p">.</span><span class="nx">font</span><span class="p">.</span><span class="nx">draw</span><span class="p">(</span><span class="nx">element</span><span class="p">.</span><span class="nx">keybind</span><span class="p">.</span><span class="nx">substr</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span><span class="mi">4</span><span class="p">).</span><span class="nx">toUpperCase</span><span class="p">(),</span><span class="nx">element</span><span class="p">.</span><span class="nx">pos</span><span class="p">.</span><span class="nx">x</span><span class="o">+</span><span class="nx">element</span><span class="p">.</span><span class="nx">size</span><span class="p">.</span><span class="nx">x</span><span class="o">-</span><span class="mi">2</span><span class="p">,</span> <span class="nx">element</span><span class="p">.</span><span class="nx">pos</span><span class="p">.</span><span class="nx">y</span><span class="p">,</span> <span class="nx">ig</span><span class="p">.</span><span class="nx">Font</span><span class="p">.</span><span class="nx">ALIGN</span><span class="p">.</span><span class="nx">RIGHT</span><span class="p">);</span></div><div class='line' id='LC182'>					<span class="p">}</span></div><div class='line' id='LC183'>					<span class="c1">// Show Title</span></div><div class='line' id='LC184'>					<span class="k">if</span> <span class="p">(</span><span class="nx">element</span><span class="p">.</span><span class="nx">showTitle</span> <span class="o">&amp;&amp;</span> <span class="nx">element</span><span class="p">.</span><span class="nx">font</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC185'>						<span class="nx">element</span><span class="p">.</span><span class="nx">font</span><span class="p">.</span><span class="nx">draw</span><span class="p">(</span><span class="nx">element</span><span class="p">.</span><span class="nx">title</span><span class="p">.</span><span class="nx">toUpperCase</span><span class="p">(),</span> <span class="nx">element</span><span class="p">.</span><span class="nx">pos</span><span class="p">.</span><span class="nx">x</span><span class="o">+</span><span class="mi">3</span><span class="p">,</span> <span class="p">(</span><span class="nx">element</span><span class="p">.</span><span class="nx">pos</span><span class="p">.</span><span class="nx">y</span><span class="o">+</span><span class="nx">element</span><span class="p">.</span><span class="nx">size</span><span class="p">.</span><span class="nx">y</span><span class="p">)</span><span class="o">-</span><span class="p">(</span><span class="nx">element</span><span class="p">.</span><span class="nx">font</span><span class="p">.</span><span class="nx">height</span><span class="o">-</span><span class="mi">2</span><span class="p">),</span> <span class="nx">ig</span><span class="p">.</span><span class="nx">Font</span><span class="p">.</span><span class="nx">ALIGN</span><span class="p">.</span><span class="nx">LEFT</span><span class="p">);</span></div><div class='line' id='LC186'>					<span class="p">}</span></div><div class='line' id='LC187'>					<span class="c1">// Show Count</span></div><div class='line' id='LC188'>					<span class="k">if</span> <span class="p">(</span><span class="nx">element</span><span class="p">.</span><span class="nx">count</span> <span class="o">&gt;</span> <span class="mi">1</span> <span class="o">&amp;&amp;</span> <span class="nx">element</span><span class="p">.</span><span class="nx">font</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC189'>						<span class="nx">element</span><span class="p">.</span><span class="nx">font</span><span class="p">.</span><span class="nx">draw</span><span class="p">(</span><span class="nx">element</span><span class="p">.</span><span class="nx">count</span><span class="p">,(</span><span class="nx">element</span><span class="p">.</span><span class="nx">pos</span><span class="p">.</span><span class="nx">x</span><span class="o">+</span><span class="nx">element</span><span class="p">.</span><span class="nx">size</span><span class="p">.</span><span class="nx">x</span><span class="p">)</span><span class="o">-</span><span class="mi">2</span><span class="p">,(</span><span class="nx">element</span><span class="p">.</span><span class="nx">pos</span><span class="p">.</span><span class="nx">y</span><span class="o">+</span><span class="nx">element</span><span class="p">.</span><span class="nx">size</span><span class="p">.</span><span class="nx">y</span><span class="p">)</span><span class="o">-</span><span class="p">(</span><span class="nx">element</span><span class="p">.</span><span class="nx">font</span><span class="p">.</span><span class="nx">height</span><span class="o">-</span><span class="mi">2</span><span class="p">),</span> <span class="nx">ig</span><span class="p">.</span><span class="nx">Font</span><span class="p">.</span><span class="nx">ALIGN</span><span class="p">.</span><span class="nx">RIGHT</span><span class="p">);</span></div><div class='line' id='LC190'>					<span class="p">}</span></div><div class='line' id='LC191'><br/></div><div class='line' id='LC192'>					<span class="c1">// Restore</span></div><div class='line' id='LC193'>					<span class="nx">ig</span><span class="p">.</span><span class="nx">system</span><span class="p">.</span><span class="nx">context</span><span class="p">.</span><span class="nx">globalAlpha</span> <span class="o">=</span> <span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC194'>				<span class="p">}</span></div><div class='line' id='LC195'>			<span class="p">}</span></div><div class='line' id='LC196'>		<span class="p">},</span></div><div class='line' id='LC197'><br/></div><div class='line' id='LC198'>		<span class="c1">// Draw</span></div><div class='line' id='LC199'>		<span class="nx">draw</span><span class="o">:</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC200'>			<span class="k">this</span><span class="p">.</span><span class="nx">element</span><span class="p">.</span><span class="nx">draw</span><span class="p">();</span></div><div class='line' id='LC201'>			<span class="c1">// Capture mouse</span></div><div class='line' id='LC202'>			<span class="k">this</span><span class="p">.</span><span class="nx">cursor</span><span class="p">.</span><span class="nx">pos</span> <span class="o">=</span> <span class="p">{</span></div><div class='line' id='LC203'>				<span class="nx">x</span><span class="o">:</span> <span class="nx">ig</span><span class="p">.</span><span class="nx">input</span><span class="p">.</span><span class="nx">mouse</span><span class="p">.</span><span class="nx">x</span><span class="p">,</span></div><div class='line' id='LC204'>				<span class="nx">y</span><span class="o">:</span> <span class="nx">ig</span><span class="p">.</span><span class="nx">input</span><span class="p">.</span><span class="nx">mouse</span><span class="p">.</span><span class="nx">y</span></div><div class='line' id='LC205'>			<span class="p">}</span></div><div class='line' id='LC206'>			<span class="k">this</span><span class="p">.</span><span class="nx">cursor</span><span class="p">.</span><span class="nx">draw</span><span class="p">();</span></div><div class='line' id='LC207'>		<span class="p">}</span></div><div class='line' id='LC208'>	<span class="p">}</span></div><div class='line' id='LC209'><br/></div><div class='line' id='LC210'>	<span class="c1">// Initialize and draw</span></div><div class='line' id='LC211'>	<span class="nx">ig</span><span class="p">.</span><span class="nx">Game</span><span class="p">.</span><span class="nx">inject</span><span class="p">({</span></div><div class='line' id='LC212'>		<span class="nx">update</span><span class="o">:</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC213'>			<span class="k">this</span><span class="p">.</span><span class="nx">parent</span><span class="p">();</span></div><div class='line' id='LC214'><br/></div><div class='line' id='LC215'>			<span class="c1">// Initialize GUI</span></div><div class='line' id='LC216'>			<span class="k">if</span><span class="p">(</span><span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">initialized</span><span class="p">)</span> <span class="k">return</span><span class="p">;</span> <span class="k">else</span> <span class="nx">ig</span><span class="p">.</span><span class="nx">gui</span><span class="p">.</span><span class="nx">initialized</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span></div><div class='line' id='LC217'><br/></div><div class='line' id='LC218'>			<span class="c1">// Bind</span></div><div class='line' id='LC219'>			<span class="nx">ig</span><span class="p">.</span><span class="nx">input</span><span class="p">.</span><span class="nx">bind</span><span class="p">(</span><span class="nx">ig</span><span class="p">.</span><span class="nx">KEY</span><span class="p">.</span><span class="nx">MOUSE1</span><span class="p">,</span> <span class="s1">&#39;mouse1&#39;</span><span class="p">);</span></div><div class='line' id='LC220'>		<span class="p">}</span></div><div class='line' id='LC221'>	<span class="p">});</span></div><div class='line' id='LC222'><span class="p">});</span></div></pre></div></td>
          </tr>
        </table>
  </div>

  </div>
</div>

<a href="#jump-to-line" rel="facebox[.linejump]" data-hotkey="l" class="js-jump-to-line" style="display:none">Jump to Line</a>
<div id="jump-to-line" style="display:none">
  <form accept-charset="UTF-8" class="js-jump-to-line-form">
    <input class="linejump-input js-jump-to-line-field" type="text" placeholder="Jump to line&hellip;" autofocus>
    <button type="submit" class="button">Go</button>
  </form>
</div>

        </div>

      </div><!-- /.repo-container -->
      <div class="modal-backdrop"></div>
    </div><!-- /.container -->
  </div><!-- /.site -->


    </div><!-- /.wrapper -->

      <div class="container">
  <div class="site-footer">
    <ul class="site-footer-links right">
      <li><a href="https://status.github.com/">Status</a></li>
      <li><a href="http://developer.github.com">API</a></li>
      <li><a href="http://training.github.com">Training</a></li>
      <li><a href="http://shop.github.com">Shop</a></li>
      <li><a href="/blog">Blog</a></li>
      <li><a href="/about">About</a></li>

    </ul>

    <a href="/">
      <span class="mega-octicon octicon-mark-github" title="GitHub"></span>
    </a>

    <ul class="site-footer-links">
      <li>&copy; 2014 <span title="0.08216s from github-fe127-cp1-prd.iad.github.net">GitHub</span>, Inc.</li>
        <li><a href="/site/terms">Terms</a></li>
        <li><a href="/site/privacy">Privacy</a></li>
        <li><a href="/security">Security</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
  </div><!-- /.site-footer -->
</div><!-- /.container -->


    <div class="fullscreen-overlay js-fullscreen-overlay" id="fullscreen_overlay">
  <div class="fullscreen-container js-fullscreen-container">
    <div class="textarea-wrap">
      <textarea name="fullscreen-contents" id="fullscreen-contents" class="js-fullscreen-contents" placeholder="" data-suggester="fullscreen_suggester"></textarea>
    </div>
  </div>
  <div class="fullscreen-sidebar">
    <a href="#" class="exit-fullscreen js-exit-fullscreen tooltipped tooltipped-w" aria-label="Exit Zen Mode">
      <span class="mega-octicon octicon-screen-normal"></span>
    </a>
    <a href="#" class="theme-switcher js-theme-switcher tooltipped tooltipped-w"
      aria-label="Switch themes">
      <span class="octicon octicon-color-mode"></span>
    </a>
  </div>
</div>



    <div id="ajax-error-message" class="flash flash-error">
      <span class="octicon octicon-alert"></span>
      <a href="#" class="octicon octicon-remove-close close js-ajax-error-dismiss"></a>
      Something went wrong with that request. Please try again.
    </div>

  </body>
</html>

