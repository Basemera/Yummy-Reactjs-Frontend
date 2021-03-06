import React, { Component } from 'react';

/**
 * Component rendering some info about good feeding.
 * @author [Hadijah kyampeire](https://github.com/hadijahkyampeire/Yummy_Reactjs_frontend)
 */
class About extends Component {
  render() {
    return (
      <div id="about">
        <h1>About Yummy Recipes</h1>
        <h4>It is a web app, built in React and it consumes a Flask API, It is a platform for,
                  people who care about their nutrition go ahead and note down their recipes so as to keep practicing
        </h4>
        <h1>Why Yummy Recipes App</h1>
        <h4>
              Your food choices each day affect your health — how you feel today, tomorrow, and in the future.
            Good nutrition is an important part of leading a healthy lifestyle. Combined with physical activity,
            your diet can help you to reach and maintain a healthy weight, reduce your risk of chronic diseases
            (like heart disease and cancer), and promote your overall health.
        </h4>
        <h1>The Impact of Nutrition on Your Health</h1>
        <h4>
              Unhealthy eating habits have contributed to the obesity epidemic in the United States:
               about one-third of U.S. adults (33.8%) are obese and approximately 17% (or 12.5 million) of children and adolescents
               aged 2—19 years are obese.1 Even for people at a healthy weight, a poor diet is associated with major health risks that
               can cause illness and even death. These include heart disease, hypertension (high blood pressure), type 2 diabetes,
               osteoporosis, and certain types of cancer. By making smart food choices, you can help protect yourself from these health problems.
        </h4>
      </div>
    );
  }
}
export default About;
