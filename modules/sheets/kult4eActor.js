


export default class kult4eActor extends Actor {

  async woundEffect(){
    var i;
    let modifier = 0;
    for (i=1; i<5; i++){
            if (getProperty(this.data.data.attributes, `woundtext.majorwound${i}`) && (getProperty(this.data.data.attributes, `woundstabilized.majorwound${i}`) == "false")){

          modifier = 1
      }

    }
      return modifier;
  }


    async moveroll(movename){
    const actordata = this.data;
    let data = actordata.items.filter(function(item) {return item.name == movename} );
    const type = "active";
    const movetype = data[0].data.type;
    if (movetype == "passive")
    {alert("This ability is Passive");}
    else{
    const attr = data[0].data.attributemod;
    const successtext = data[0].data.completesuccess;
    const failuretext = data[0].data.failure;
    const partialsuccess = data[0].data.partialsuccess;
    const specialflag = data[0].data.specialflag;
    let mod = 0;
    let harm = 0;
    if (movename == "Endure Injury (+Fortitude)"){
      let boxoutput = await new Promise(resolve => {
        new Dialog({
        title: "Endure Harm",
        content: '<label>How much Harm did you suffer?</label><input id="harm_value" data-type="number"',
        default: 'one',
        buttons:{
              one: {label: "Ok",
                callback: () => {
                      resolve({
                        "harm_value": document.getElementById("harm_value").value

                      })
                }
             }
            }

      }).render(true);
      })
      harm = boxoutput.harm_value;
    }

    if(attr != '') {
        mod = this.data.data.attributes[attr];
    }

    let stab = this.data.data.stability.value;
    let situation = parseInt(this.data.data.sitmod);
    console.log(`Sitmod is ` + this.data.data.sitmod);
    let woundmod = await this.woundEffect();
    situation -= woundmod;
    if (specialflag == 0 && this.data.data.attributes.criticalwound && this.data.data.attributes.criticalwoundstabilized != "true")
    { situation -= 1;}
    if (specialflag == 1 && this.data.data.attributes.criticalwound && this.data.data.attributes.criticalwoundstabilized != "true")
    { situation -= 1;}
    if (specialflag == 1 && stab > 2)
      {situation -= 1};
    if (specialflag == 1 && stab > 5)
      {situation -= 1};
    if (specialflag == 2 && this.data.data.attributes.criticalwound && this.data.data.attributes.criticalwoundstabilized != "true")
      { situation -= 1;}
    if (specialflag == 2 && stab > 5)
      {situation += 1};
    if (specialflag == 3 && this.data.data.attributes.criticalwound && this.data.data.attributes.criticalwoundstabilized != "true")
      { situation -= 1;}
    if (specialflag == 4 && getProperty(this.data.data.attributes, `woundtext.majorwound1`) && (getProperty(this.data.data.attributes, `woundstabilized.majorwound1`) == "false"))
      {situation += 1}
      else if (specialflag == 4 && getProperty(this.data.data.attributes, `woundtext.majorwound2`) && (getProperty(this.data.data.attributes, `woundstabilized.majorwound2`) == "false"))
        {situation += 1}
        else if (specialflag == 4 && getProperty(this.data.data.attributes, `woundtext.majorwound3`) && (getProperty(this.data.data.attributes, `woundstabilized.majorwound3`) == "false"))
            {situation += 1}
            else if (specialflag == 4 && getProperty(this.data.data.attributes, `woundtext.majorwound4`) && (getProperty(this.data.data.attributes, `woundstabilized.majorwound4`) == "false"))
                {situation += 1}
    if (specialflag == 4 && stab > 0)
      {situation -= 1};
    if (specialflag == 4 && stab > 2)
      {situation -= 1};
    if (specialflag == 4 && stab > 5)
      {situation -= 1};
    if (specialflag == 5 && this.data.data.attributes.criticalwound && this.data.data.attributes.criticalwoundstabilized != "true")
      { situation -= 1;}

    let r = new Roll (`2d10 + ${mod} + ${situation} - ${harm}`).roll();

    if (game.dice3d) {let r = new Roll (`2d10 + ${mod} + ${situation} - ${harm}`).roll();
    game.dice3d.showForRoll(r).then(displayed => {
    if(r.total){
      console.log("Roll Successful")
      const updated = this.update({"data.sitmod": 0});
      console.log(`Sitmod is ` + this.data.data.sitmod);
    }
    if (r.total >= 15)
    {ChatMessage.create({ content: "<div class='move-name'>" + movename + "</div> <div class = 'move-name'> Success! </div> <div class = 'move-result'>" + successtext + "</div> <div class = 'result-roll'> <div class='tooltip'>"  + r.total + "<span class='tooltiptext'> " + r.result + "</span></div></div>", speaker: ChatMessage.getSpeaker({alias: this.name})});
    }
    else if (r.total < 10)
    {ChatMessage.create({ content: "<div class='move-name'>" + movename + "</div> <div class = 'move-name'> Failure! </div> <div class = 'move-result'>" + failuretext + "</div> <div class = 'result-roll'> <div class='tooltip'>"  + r.total + "<span class='tooltiptext'> " + r.result + "</span></div></div>", speaker: ChatMessage.getSpeaker({alias: this.name})});
    }
    else
    {ChatMessage.create({ content: "<div class='move-name'>" + movename + "</div> <div class = 'move-name'> Partial Success! </div> <div class = 'move-result'>" + partialsuccess + "</div> <div class = 'result-roll'> <div class='tooltip'>"  + r.total + "<span class='tooltiptext'> " + r.result + "</span></div></div>", speaker: ChatMessage.getSpeaker({alias: this.name})});
    }});}
  else {if(r.total){
    console.log("Roll Successful")
    const updated = this.update({"data.sitmod": 0});
    console.log(`Sitmod is ` + this.data.data.sitmod);
  }
  if (r.total >= 15)
  {ChatMessage.create({ content: "<div class='move-name'>" + movename + "</div> <div class = 'move-name'> Success! </div> <div class = 'move-result'>" + successtext + "</div> <div class = 'result-roll'> <div class='tooltip'>"  + r.total + "<span class='tooltiptext'> " + r.result + "</span></div></div>", speaker: ChatMessage.getSpeaker({alias: this.name})});
  }
  else if (r.total < 10)
  {ChatMessage.create({ content: "<div class='move-name'>" + movename + "</div> <div class = 'move-name'> Failure! </div> <div class = 'move-result'>" + failuretext + "</div> <div class = 'result-roll'> <div class='tooltip'>"  + r.total + "<span class='tooltiptext'> " + r.result + "</span></div></div>", speaker: ChatMessage.getSpeaker({alias: this.name})});
  }
  else
  {ChatMessage.create({ content: "<div class='move-name'>" + movename + "</div> <div class = 'move-name'> Partial Success! </div> <div class = 'move-result'>" + partialsuccess + "</div> <div class = 'result-roll'> <div class='tooltip'>"  + r.total + "<span class='tooltiptext'> " + r.result + "</span></div></div>", speaker: ChatMessage.getSpeaker({alias: this.name})});
}}
  }


  }



}
