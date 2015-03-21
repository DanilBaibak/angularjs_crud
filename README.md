<h1><strong>AngularJS CRUD application</strong></h1>

<h2><strong>Purpose</strong></h2>

<p>The idea is to demonstrate opportunities for the creation <strong>single page application</strong> using <strong>AngularJS</strong>(version 1.3.0). Current example implements all main goals of&nbsp;<strong>CRUD</strong>. Application is designed to work with <strong>RESTful API</strong>. For tests is using <a href="http://karma-runner.github.io/" target="_blank">Karma</a>.<br />
<br />
Project implements main functionality of the TODO application.</p>

<h2><strong>Installation</strong></h2>

<p>Get code:</p>

<div style="background:#eee; border:1px solid #ccc; padding:5px 10px">mkdir ng_todo&nbsp;&amp;&amp;&nbsp;git clone&nbsp;https://github.com/DanilBaibak/angularjs_crud.git ng_todo&nbsp;</div>

<p>Next you need install&nbsp;<a href="http://bower.io/" target="_blank">Bower</a>:</p>

<div style="background:#eee; border:1px solid #ccc; padding:5px 10px">npm install -g bower</div>

<p>Install all source and necessary libraries :</p>

<div style="background:#eee; border:1px solid #ccc; padding:5px 10px">bower install</div>

<p>Install <a href="http://karma-runner.github.io/" target="_blank">Karma</a> for testing:</p>

<div style="background:#eee; border:1px solid #ccc; padding:5px 10px">npm install -g karma-cli</div>

<p>Edit configuration of the your server REST API. Open file <strong><em>ng_todo/js/app.js</em></strong>&nbsp;and change constant <em><strong>apiUrl</strong></em> to url of the your backend part. Example of my&nbsp;RESTful API you can find&nbsp;<a href="https://github.com/DanilBaibak/rest_api" target="_blank">here</a></p>

<div style="background:#eee; border:1px solid #ccc; padding:5px 10px">.constant(&#39;apiUrl&#39;, &#39;http://rest_my.work/&#39;)</div>

<p>Run tests:</p>

<div style="background:#eee; border:1px solid #ccc; padding:5px 10px">karma&nbsp;start karma.conf.js</div>
