# 0008. Supported Browsers and Devices

## Date

2023-04-11

## Approved By

@danascheider

## Decision

We will support the following browsers:

- Brave (Desktop)
- Chrome (Desktop)
- Safari (Desktop, tablet, mobile)

We will also support the following devices:

- iPhone 12+
- iPad 3rd generation or later

## Glossary

- **Cross-Browser Testing:** Testing of an application on multiple browsers or devices to guarantee support for each browser tested

## Context

One of the biggest challenges of front-end development is cross-browser compatibility. Supporting a wider range of browsers - especially older browsers - limits the HTML, CSS, and JavaScript features that can be used in an application. Factoring in different devices, such as smartphones, smart watches, and tablets, creates an even greater challenge. We want to limit cross-browser testing requirements and maximise the number of features of HTML, CSS, and JavaScript that we are able to use, while also giving users the flexibility to use preferred browsers and devices.

## Considerations

We only have one user we care about, and that user uses the latest versions of Brave and Chrome for desktop and Safari on iPad and iPhone. Therefore, these are the browsers we need to focus on the most. Android support is not a priority.

## Summary

In order to limit the need for extensive cross-browser testing, we are limiting support to the latest versions of Brave, Chrome, and Safari (on desktop), as well as Safari on iOS for iPad and iPhone.
