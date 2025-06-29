---
layout: default
title: Home
---

## Latest Posts


<ul class="post-list">
  {% for post in site.posts %}
    <li>
      {% if post.thumbnail %}
        <a href="{{ post.url | relative_url }}">
          <img src="{{ post.thumbnail | relative_url }}" alt="{{ post.title }} thumbnail" class="post-thumbnail">
        </a>
      {% endif %}
      <div class="post-info">
        <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
        <p><small>Posted on {{ post.date | date: "%B %d, %Y" }}</small></p>
        <p>{{ post.excerpt }}</p>
      </div>
    </li>
  {% endfor %}
</ul>
