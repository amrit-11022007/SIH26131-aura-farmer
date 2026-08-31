# 🌾 CropGuard: AI-Driven Crop Health Surveillance & Predictive Advisory System

[![SIH Problem Statement](https://img.shields.io/badge/SIH2024-PS%20SIH26131-orange.svg)](https://sih.gov.in/)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Presentation](https://img.shields.io/badge/Canva-Presentation-blueviolet.svg)](https://www.canva.com/design/DAHTxy8PV_w/NPWVLiz5ivyDxl2A3tXlRg/edit)
[![Live Preview](https://img.shields.io/badge/Live_Preview-Click_Here-brightgreen?style=flat&logo=vercel)](https://sih-26131-aura-farmer-jet.vercel.app/)

> **AURA Farmer** (Automated Risk & Understanding Assistant for Farmers) is an end-to-end, multi-layered crop health monitoring platform. By fusing AI-powered visual diagnosis, IoT pest-trap and environmental sensor streams, weather-based risk forecasting, geospatial analytics, and expert validation workflows, AURA delivers actionable, hyper-local pest and disease management advisories directly to farmers and extension workers.

---

## 📌 CropGuard

Farmers frequently detect crop diseases and pest infestations **only after visible damage has already spread across fields**. Key bottlenecks include:

* **Delayed Diagnosis:** Extension workers cover vast geographical zones with limited bandwidth; laboratory diagnosis is slow or inaccessible.
* **Siloed Contextual Data:** Real-time weather, crop growth stages, seed varieties, soil parameters, and regional pest history are rarely combined into dynamic farm-level risk alerts.
* **Improper Chemical Usage:** Misdiagnosis leads to excessive or inappropriate pesticide application, escalating input costs, degrading soil health, causing pesticide resistance, leaving chemical residues, and reducing final crop yields.

### 💡 Objective & Solution
AURA Farmer bridges the gap between field-level indicators and agricultural expertise. It combines mobile-first image diagnosis with multi-source sensor and meteorological data to offer **early-stage detection**, **predictive risk forecasting**, and **Integrated Pest & Disease Management (IPDM)** advisories.

---

## ✨ Key Features

### 📸 1. AI Image-Based Disease & Pest Detection
* **Real-time Visual Diagnosis:** Instant identification of leaf, stem, fruit, and root pathologies via mobile/web photo upload.

### 🌐 2. IoT Sensor & Smart Pest-Trap Integration
* **Pest Count Automation:** Smart camera-enabled pest trap integration to automate insect counts (e.g., fall armyworm, pink bollworm).
* **Soil & Microclimate telemetry:** Continuous ingestion of soil moisture, temperature, humidity, and microclimate metrics.

### 🌤️ 3. Weather-Based Predictive Risk Forecasting
* **Dynamic Epidemiological Modeling:** Fuses real-time weather forecasts (humidity spikes, temperature windows, rainfall) with crop growth stage and soil data to predict disease outbreaks *before* visual symptoms manifest.

### 🗺️ 4. Geospatial Hotspot Mapping & Surveillance
* **GIS Spatial Clusters:** Interactive heatmaps for agriculture officials and extension staff to monitor emerging disease clusters across districts.
* **Early Warning Zone Alerts:** Geofenced broadcasts sent to neighboring farms when an outbreak is verified in a regional cluster.

### 🩺 5. Expert Validation & Lab Referral System
* **Human-in-the-Loop AI:** Uncertain predictions are automatically escalated to a verification queue for extension officers or university agronomists.

### 🗣️ 6. Multilingual & Audio Advisories
* **Vernacular Language Support:** Multilingual voice and text advisories (supporting Hindi, English, Marathi).

### 🌿 7. Integrated Pest Management (IPM) & Safe Dosage Guidance
* **Actionable Treatment Plans:** Eco-friendly biological control suggestions prior to chemical interventions.
* **Safe Chemical Prescriptions:** Precise dosage calculations based on land area to prevent chemical overuse and crop damage.

### 📊 8. Field Confirmation Feedback Loop & Admin Dashboards
* **Continuous Machine Learning:** System learns from field-level confirmations provided by extension workers to continuously improve AI precision.
* **Government/Officer Dashboards:** Macro-level analytical tools for stock planning of bio-pesticides, disaster response, and regional risk assessment.

---

## 🛠️ Tech Stack

| Domain | Frameworks & Libraries |
| :--- | :--- |
| **Mobile & Frontend** | ElectronJS, NextJS, Tailwind CSS |
| **Backend & APIs** | Python (FastAPI / Django), Node.js |
| **AI / Computer Vision** | PyTorch, OpenCV, YOLOv8 / ResNet50 |
| **Database & GIS** | PostgreSQL / PostGIS, MongoDB, Redis |
| **IoT & Communications** | MQTT Protocol, Node-RED, WebSockets |
| **Cloud & Deployment** | Docker, Kubernetes, AWS / Azure Geo-spatial Services |

---

## 🚀 Quick Start Guide

### Prerequisites
* **Node.js** `>= 22.0`
* **Python** `>= 3.9`
* **Docker** & **Docker Compose**

### 1. Clone the Repository
```bash
git clone [https://github.com/kartik-tiwariR20/SIH26131-aura-farmer.git](https://github.com/kartik-tiwariR20/SIH26131-aura-farmer.git)
cd SIH26131-aura-farmer
```

### 2. ML setup
```bash
cd Model
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
### 3. NextJS setup
```bash
cd farmer-frontend
npm install -g pnpm //If pnpm not installed
pnpm dlx shadcn@latest init
pnpm install
pnpm build
pnpm dev
```

### 4. Electron app setup
```bash
npm install
npm run electron
```
