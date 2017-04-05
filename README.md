# GrafanaPoC

## Overview
Proof of concept for displaying application performance monitoring information in [Grafana](https://grafana.com)
Grafana normally reads information from a data source such as a timeseries nosql database like Prometheus.
This demonstrates how to use Grafana with the [SimpleJson data source.](https://grafana.com/plugins/grafana-simple-json-datasource)

The data source has to expose the following endpoints:
 * `/` should return `200 ok`. Used for "Test connection" on the datasource config page.
 * `/search` used by the find metric options on the query tab in panels.
 * `/query` should return metrics based on input.
 * `/annotations` should return annotations.
 
It appears that statsd information can be displayed with [InfluxDB](http://www.roblayton.com/2015/05/analyzing-your-applications-with-statsd.html) 
or [Prometheus](https://github.com/prometheus/statsd_exporter)

## Setup

### Setup Node

 * Install node v7.8 or higher via `nvm`
 * `npm install`
 
### Grafana Docker Install
 * We are using the Grafana Docker image from [dockerhub](https://hub.docker.com/r/grafana/grafana/)
 * Run the image with plugins: `docker run -p 3000:3000 -e "GF_INSTALL_PLUGINS=grafana-piechart-panel,grafana-simple-json-datasource" grafana/grafana`

## Startup 

### Setup Data Source

 * `npm start` starts the service on port 9000
 * Run Grafana as per the above docker run command
 * Navigate to `localhost:3000` in a browser
 * login as `admin/admin`
 * Add data source
   * name: `simplejson` 
   * type: `SimpleJson` 
   * url: `http://localhost:9000`
   * proxy: `direct`

### Import Dashboard
 * Click top left orange icon
 * Dashboards -> Import
 * Upload JSON file: `graphana/home-*.json`
 * Select datasource from dropdown: `simplejson`
 * Click `Import` button
 * Enjoy!
 
## Reference Info
Feel free to skip this, this information not needed but kept here for reference.

### Grafana Local Install
 * `brew update; brew install grafana`  See [Grafana Installation instructions](https://grafana.com/grafana/download) for more details.
 * `brew services start grafana` Run Grafana via launchd and restart at login
 * or just run it locally: `grafana-server --config=/usr/local/etc/grafana/grafana.ini --homepath /usr/local/share/grafana cfg:default.paths.logs=/usr/local/var/log/grafana cfg:default.paths.data=/usr/local/var/lib/grafana cfg:default.paths.plugins=/usr/local/var/lib/grafana/plugins`
 * Documentation on installing plugins: `https://github.com/grafana/grafana-docker#installing-plugins-for-grafana-3`

### Grafana Plugins we use
 * Piechart Plugin: `grafana-cli plugins install grafana-piechart-panel`
 * SimpleJson panel: `grafana-cli plugins install grafana-simple-json-datasource`

### Other Grafana Plugins of interest
 * Worldmap panel: `grafana-cli plugins install grafana-worldmap-panel`
 * Google calendar plugin to show calendar events as annotations: `grafana-cli plugins install mtanda-google-calendar-datasource`
 * Histogram panel: `grafana-cli plugins install mtanda-histogram-panel`

### Dashboard Configuration
   This is not needed since we have the JSON file is not available for import
   
 * New dashboard: `Home`
 * New Graph
   * Title: `Error Count by Hour`
   * DataSource: `SimpleJson`
   * Metric type: `timeseries`
   * Metric name: `error-report`
   * Display draw mode: `bars`
   * Time range start: `2017-03-08 17:00:00`
   * Time range end: `2017-03-09 17:00:00`
 * New Pie Chart:
   * Title: `Error count by Device`
   * DataSource: `SimpleJson`
   * Metric name: `device-report`
   * Legend show legend
   * Legend position: `on graph`
   * Legend font size: `120%`
   * Legend values: `on`
   * Legend show percentage: `on`
 * Save dashboard and star it
