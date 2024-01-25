<h1>Readme for The PicViewer</h1>

<h2>Overview</h2>
<p>"PicViewer" is a web application where users watch an image for as long as possible. This project is a minimalistic full-stack application using a MySQL database, Sequelize ORM, and an MVC structure.</p>

<h2>Features</h2>
<ul>
  <li><strong>Image Watching</strong>: Watch an image of "Sanx".</li>
  <li><strong>Time Tracking</strong>: Tracks the watching time.</li>
  <li><strong>Leaderboard</strong>: Displays top times.</li>
  <li><strong>Submit Time</strong>: Submit your time with a name.</li>
</ul>

<h2>Tech Stack</h2>
<ul>
  <li><strong>Frontend</strong>: HTML, CSS, JavaScript</li>
  <li><strong>Backend</strong>: Node.js, Express.js</li>
  <li><strong>Database</strong>: MySQL</li>
  <li><strong>ORM</strong>: Sequelize</li>
</ul>

<h2>Installation</h2>
<h3>Prerequisites</h3>
<ul>
  <li>Node.js</li>
  <li>MySQL</li>
</ul>

<h3>Setup</h3>
<ol>
  <li><strong>Clone the Repository</strong>
    <pre><code>git clone https://github.com/Kristofer-Robin/PicViewer</code></pre>
  </li>
  <li><strong>Install Dependencies</strong>
    <pre><code>cd Picviewer
npm install
npm install express sequelize mysql2 cors
</code></pre>
  </li>
  <li><strong>Database Configuration</strong>
    <ul>
      <li>Ensure MySQL is running:
        <pre><code>mysqladmin -u root -p status</code></pre>
      </li>
      <li>Create the `leaderboard` database:
        <pre><code>mysql -u root -p
CREATE DATABASE leaderboard;
exit;</code></pre>
      </li>
      <li>Update the connection in `server.js`:
        <pre><code>const sequelize = new Sequelize('mysql://root:&lt;password&gt;@localhost:3306/leaderboard', {
    dialect: 'mysql'
});</code></pre>
      </li>
    </ul>
  </li>
  <li><strong>Start the Application</strong>
    <pre><code>node server.js</code></pre>
  </li>
</ol>

<h2>Usage</h2>
<ol>
  <li><strong>Open Application</strong>
    <p>Navigate to <code>http://localhost:3000</code>.</p>
  </li>
  <li><strong>Watching The Sanx</strong>
    <p>Watch the image and your time being tracked.</p>
  </li>
  <li><strong>Submitting Your Time</strong>
    <p>Click "Submit Time", enter name, and submit.</p>
  </li>
  <li><strong>Viewing the Leaderboard</strong>
    <p>Go to <code>http://localhost:3000/results.html</code>.</p>
  </li>
</ol>

<h2>License</h2>
<p>MIT License</p>
