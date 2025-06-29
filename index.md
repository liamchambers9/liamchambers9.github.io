---
layout: default
title: Home
---

## Latest Posts

<ul>
  {% for post in site.posts %}
    <li>
      <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <p>{{ post.excerpt }}</p>
      <p><small>Posted on {{ post.date | date: "%B %d, %Y" }}</small></p>
    </li>
  {% endfor %}
</ul>
