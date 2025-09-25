console.log('ok');

const genarateScript = () => {
  let div = document.getElementById('allScripts');
  for (let i = 1; i < 80; i++) {
    if (i % 2 !== 0) {
      let makeNewDiv = document.createElement('div');

      let scriptIs = `
     &ltscript
        type="module"
        src="../js/font-awesome,goolefonttrue-tailwind-bootstrap-html--min-advance-classes-of-fonts-${i}.js"
      &gt &lt/script&gt
    
    `;
      makeNewDiv.innerHTML = scriptIs;

      div.appendChild(makeNewDiv);
    }
  }
};
genarateScript();
