# Loan Payment Application UI Exercise

## Introduction

Thank you for considering my submission for the UI exercise as part of the application process at OneMain. This project showcases a modern approach to the typical online payment form, emphasizing a clean, user-friendly design and innovative features to enhance efficiency and usability.

## Design Philosophy

In alignment with discussions with the recruiters, I ventured beyond the initial design specifications to explore a minimalist and contemporary aesthetic. This creative direction was chosen to inject a fresh perspective into the project and highlight the potential for design innovation in enhancing user experience.

- **Minimalist and Modern Design**: Prioritizes clarity, usability, and aesthetic appeal, ensuring a seamless experience for users.
- **OCR Automation for Form Inputs**: Utilizes [Tesseract.js](https://github.com/naptha/tesseract.js#tesseractjs) to extract payment information from images of mock checks and debit cards. This proof of concept (POC) aims to streamline data entry processes and showcase the application's potential for real-world scenarios.
- **Angular 17.2 Integration**: Demonstrates the effective use of the latest Angular features to build dynamic, responsive web applications.

## Running the Application Locally

To explore the application:

1. **Install `http-server`** (if not previously installed):
   ```sh
   npm install http-server -g
   ```
2. **Navigate to the project directory**:
   ```sh
   cd path/to/project
   ```
3. **Serve the application**:
   ```sh
   http-server dist/loan-payment/browser
   ```
4. **Access the application** at [http://localhost:8080/](http://localhost:8080/).

## Testing OCR Automation

The application's OCR functionality can be tested using two provided images: `check.jpg` and `debit.jpg`, found in the project root.

### Steps:

- **For `check.jpg`**: Use the designated upload button to select `check.jpg` and observe the automatic population of routing and account numbers.
- **For `debit.jpg`**: After switching to the debit card payment method, upload `debit.jpg` to auto-fill the card number and expiration date.

### Expected Outcomes:

- **Check Processing**: Routing and account numbers are extracted and filled automatically.
- **Debit Card Processing**: Card number and expiration date are recognized and populated into the respective form fields.

This feature is designed as a POC to illustrate how OCR technology can minimize manual input and enhance the user experience.

## Project Considerations

This submission aims to balance adherence to the provided design specifications with the exploration of new design and technology possibilities. It is my hope that this project will serve as a basis for discussing:

- **Design Innovation**: The rationale behind the design updates and their potential impact.
- **Technical Feasibility**: The implementation of OCR as a tool for improving form interaction.
- **Angular's Latest Features**: How Angular 17.2 can be leveraged to create efficient, scalable web applications.

I look forward to your feedback and the opportunity to discuss how these elements can contribute to the team at OneMain.

---

This README.md is structured to give a comprehensive overview of your project, its objectives, and instructions for both running and evaluating its features. Feel free to adjust any section to better match the specifics of your project or personal style.
