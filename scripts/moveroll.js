function moverolling(movename, moveattribute, attributevalue, sitmod, forward, stability, woundmod)
{

    if (name == "Keep It Together" && stability > 3)
      {sitmod -= 1};
    if (name == "Keep It Together" && stability > 6)
      {sitmod -= 1};
    if (name == "See Through the Illusion" && stability > 6)
      {sitmod += 1};
    if (name == "Endure Harm")
        {getAttribute()};

    let situation = sitmod + forward + woundmod;
    console.log(`${situation}`);
    let r = new Roll(`2d10 + ${attributevalue} + ${situation}`);
    r.roll();  game.dice3d.showForRoll(r);
    if (r.total >= 15)
    {ChatMessage.create({ content: "<p>" + item.name + "</p>" + r.result + "<p>" + r.total + "</p>" + item.data.data.completesuccess, speaker: ChatMessage.getSpeaker({alias: this.actor.name})});
    }
    else if (r.total <= 10)
    {ChatMessage.create({content: "<p>" + item.name + "</p>" + r.result + "<p>" + r.total + "</p>" + item.data.data.failure, speaker: ChatMessage.getSpeaker({alias: this.actor.name}) });
    }
    else
    {ChatMessage.create({content: "<p>" + item.name + "</p>" + r.result + "<p>" + r.total + "</p>" + item.data.data.partialsuccess, speaker: ChatMessage.getSpeaker({alias: this.actor.name})});
    }
};
