import { Component } from '@angular/core';

@Component({
  selector: 'win-experience',
  standalone: true,
  template: `
<div class="xp-content" style="padding: 8px;">
  <h1>Experience</h1>
  <div style="border-bottom: 2px solid #3973d6; width: 60px; margin-bottom: 12px;"></div>

  <div class="xp-timeline-item">
    <div class="xp-timeline-dot work"></div>
    <div class="xp-timeline-content">
      <div class="xp-timeline-header">
        <span class="xp-timeline-title">Software Developer</span>
        <span class="xp-timeline-date">Aug 2024 - Present</span>
      </div>
      <div class="xp-timeline-org">Zoox &middot; Foster City, California</div>
      <ul>
        <li>Developed and maintained web applications using Spring Boot and Angular</li>
        <li>Collaborated with cross-functional teams to deliver features on time</li>
        <li>Implemented RESTful APIs and integrated third-party services</li>
      </ul>
    </div>
  </div>

  <div class="xp-timeline-item">
    <div class="xp-timeline-dot work"></div>
    <div class="xp-timeline-content">
      <div class="xp-timeline-header">
        <span class="xp-timeline-title">Java Developer</span>
        <span class="xp-timeline-date">Aug 2022 - Jul 2024</span>
      </div>
      <div class="xp-timeline-org">Wells Fargo &middot; San Leandro, California</div>
      <ul>
        <li>Developed and maintained web applications using Spring Boot and Angular</li>
        <li>Collaborated with cross-functional teams to deliver features on time</li>
        <li>Implemented RESTful APIs and integrated third-party services</li>
      </ul>
    </div>
  </div>

  <div class="xp-timeline-item">
    <div class="xp-timeline-dot work"></div>
    <div class="xp-timeline-content">
      <div class="xp-timeline-header">
        <span class="xp-timeline-title">Software Engineer</span>
        <span class="xp-timeline-date">Aug 2022 - Jul 2024</span>
      </div>
      <div class="xp-timeline-org">Conduent &middot; Austin, Texas</div>
      <ul>
        <li>Developed and maintained web applications using Spring Boot and Angular</li>
        <li>Collaborated with cross-functional teams to deliver features on time</li>
        <li>Implemented RESTful APIs and integrated third-party services</li>
      </ul>
    </div>
  </div>

  <div class="xp-timeline-item">
    <div class="xp-timeline-dot education"></div>
    <div class="xp-timeline-content">
      <div class="xp-timeline-header">
        <span class="xp-timeline-title">B.Sc. in Computer Science</span>
        <span class="xp-timeline-date">Aug 2014 - May 2018</span>
      </div>
      <div class="xp-timeline-org">CSU EAST BAY &middot; Hayward, United States</div>
      <ul>
        <li>Focused on software engineering and web development</li>
        <li>Completed projects in Java, Python, and database management</li>
      </ul>
    </div>
  </div>
</div>
  `,
})
export class ExperienceWindowComponent {}
