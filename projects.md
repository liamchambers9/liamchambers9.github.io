---
layout: default
title: My Projects
---

## My Projects

<ul class="post-list">
  {% for project in site.projects | sort: "date" | reverse %}
    <li>
      {% if project.thumbnail %}
        <a href="{{ project.url | relative_url }}">
          <img src="{{ project.thumbnail | relative_url }}" alt="{{ project.title }} thumbnail" class="post-thumbnail">
        </a>
      {% endif %}
      <div class="post-info">
        <h3><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h3>
        {% if project.date %}
          <p><small>Completed on {{ project.date | date: "%B %d, %Y" }}</small></p>
        {% endif %}
        <p>{{ project.content | strip_html | truncatewords: 30 }}</p>
      </div>
    </li>
  {% endfor %}
</ul>
