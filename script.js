"use strict";

// The model of all features
const features = {
  drinksholder: false,
  led: false,
  propeller: false,
  shield: false,
  solarfan: false
};

window.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  // register toggle-clicks
  document.querySelectorAll(".option").forEach(option => option.addEventListener("click", toggleOption));
}

function toggleOption(event) {
  const target = event.currentTarget;
  const feature = target.dataset.feature;

  // TODO: Toggle feature in "model"
  console.log(features[feature]);
  if(features[feature]) {
    features[feature] = false ;
  } else {
    features[feature] = true;
  }
  // If feature is (now) turned on:
  // - mark target as chosen (add class "chosen") DONE
  // - un-hide the feature-layer(s) in the #product-preview; DONE
  // - create featureElement and append to #selected ul DONE
  // - create FLIP-animation to animate featureElement from img in target, to
  //   its intended position. Do it with normal animation or transition class! DONE

  // Else - if the feature (became) turned off:
  // - no longer mark target as chosen DONE
  // - hide the feature-layer(s) in the #product-preview DONE
  // - find the existing featureElement in #selected ul DONE
  // - create FLIP-animation to animate featureElement to img in target DONE
  // - when animation is complete, remove featureElement from the DOM DONE

  if (features[feature]) {
    // feature added
    console.log(`Feature ${feature} is turned on!`);

    // TODO: More code
    document.querySelector(`[data-feature = ${feature}]`).classList.remove("hide");
    target.classList.add("chosen");
    let feat = createFeatureElement(feature);
    document.querySelector("#selected ul").appendChild(feat);
  
    // first
    const start = document.querySelector(`#options > [data-feature=${feature}]`).getBoundingClientRect();
    // last
    const end  = document.querySelector(`#selected ul [data-feature=${feature}]`).getBoundingClientRect();
    // invert
    const diffX = start.x - end.x;
    const diffY = start.y - end.y;

    // feat.style.transform = `translate(${diffX}px, ${diffY}px)`;
    document.querySelector(`#selected ul [data-feature=${feature}]`).style.setProperty("--diffY", diffY);
    document.querySelector(`#selected ul [data-feature=${feature}]`).style.setProperty("--diffX", diffX);
    // play
    document.querySelector(`#selected ul [data-feature=${feature}]`).classList.add("animate-feature-in");
    // requestAnimationFrame(function() {
      // console.log("animating");
      // // CSS
      // feat.style.transition = "transform 1s";
      // feat.style.transform = "translate(0,0)";
    // })
  } else {
    // feature removed
    console.log(`Feature ${feature} is turned off!`);
    
    // TODO: More code
    document.querySelector(`[data-feature = ${feature}]`).classList.add("hide");
    target.classList.remove("chosen");
    // document.querySelector(`#selected ul [data-feature=${feature}]`).remove();
  // first
  const start = document.querySelector(`#options > [data-feature=${feature}]`).getBoundingClientRect();
  // last
  const end  = document.querySelector(`#selected ul [data-feature=${feature}]`).getBoundingClientRect();
  // invert
  const diffX =  start.x - end.x;
  const diffY =  start.y - end.y;
  // feat.style.transform = `translate(${diffX}px, ${diffY}px)`;
  document.querySelector(`#selected ul [data-feature=${feature}]`).style.setProperty("--diffY", diffY);
  document.querySelector(`#selected ul [data-feature=${feature}]`).style.setProperty("--diffX", diffX);
  // play
  document.querySelector(`#selected ul [data-feature=${feature}]`).classList.add("animate-feature-out");
  document.querySelector(`#selected ul [data-feature=${feature}]`).addEventListener("animationend" ,() =>{ 
    dell(feature);
  })
  // createFeatureElement(feature);
}
}

function dell (feature) {
  document.querySelector(`#selected ul [data-feature=${feature}]`).remove()
}

// Create featureElement to be appended to #selected ul - could have used a <template> instead
function createFeatureElement(feature) {
  console.log("createFeatureElement");
  const li = document.createElement("li");
  li.dataset.feature = feature;

  const img = document.createElement("img");
  img.src = `images/feature_${feature}.png`;
  img.alt = capitalize(feature);

  li.append(img);

  return li;
}

function capitalize(text) {
  return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();
}