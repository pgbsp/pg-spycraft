const messages = [

{
    ciphertext: "KLQGPDQ QHDU FDQH KLOO",
    answer: "HINDMAN NEAR CANE HILL",

    choices: [

        "HINDMAN NEAR CANE HILL",
        "HINDMAN LEFT VAN BUREN",
        "HINDMAN MOVING EAST"

    ]
}

];

let currentMessage = null;

function selectFaction(faction){

    document
        .getElementById("factionSelect")
        .classList.add("hidden");

    document
        .getElementById("activityPanel")
        .classList.remove("hidden");

    if(faction === "union"){

        loadUnion();

    }else{

        loadConfederate();

    }

}

function loadUnion(){

    document
        .getElementById("unionActivity")
        .classList.remove("hidden");

    document
        .getElementById("storyPanel")
        .innerHTML = `

        <h2>December 5, 1862</h2>

        <p>
        You serve as a scout attached to General James
        Blunt's command. Reports suggest Confederate
        troops are gathering near Cane Hill.
        </p>

        <p>
        Headquarters needs a concise report describing
        what has been observed and how Union forces
        should respond.
        </p>

        `;

}

function loadConfederate(){

    document
        .getElementById("confederateActivity")
        .classList.remove("hidden");

    document
        .getElementById("storyPanel")
        .innerHTML = `

        <h2>December 5, 1862</h2>

        <p>
        You serve with General Thomas Hindman's army.
        Confederate cavalry has captured a Union courier
        carrying an encoded dispatch.
        </p>

        <p>
        Using the clues provided, determine the message.
        </p>

        `;

    currentMessage = messages[0];

    document
        .getElementById("cipherText")
        .textContent =
        currentMessage.ciphertext;

    const choicesBox =
        document.getElementById("cipherChoices");

    choicesBox.textContent = "";

    currentMessage.choices.forEach(choice => {

        const button =
            document.createElement("button");

        button.textContent = choice;

        button.onclick = () =>
            checkAnswer(choice);

        choicesBox.appendChild(button);

    });

}

function submitDispatch(){

    const report =
        document
        .getElementById("dispatchText")
        .value
        .toLowerCase();

    let score = 0;

    if(report.includes("cane hill")) score++;
    if(report.includes("confederate")) score++;
    if(report.includes("wagon")) score++;
    if(report.includes("cavalry")) score++;

    let response = "";

    if(score >= 3){

        response = `
        <div class="result">

        <h3>Your Dispatch Reaches Headquarters</h3>

        <p>
        The report clearly identifies Confederate
        activity near Cane Hill and summarizes
        important observations from the field.
        </p>

        <p>
        Good intelligence allowed commanders to make
        better decisions before the Battle of Prairie Grove.
        </p>

        <h3>What Happened Next?</h3>

        <p>
        On December 7, 1862, Union and Confederate
        armies met near Prairie Grove. Although the
        Confederates fought effectively, Union forces
        retained control of northwest Arkansas.
        </p>

        </div>
        `;
    }
    else{

        response = `
        <div class="result">

        <h3>Your Dispatch Reaches Headquarters</h3>

        <p>
        The report contains limited information.
        Commanders may need additional intelligence
        before acting.
        </p>

        <h3>What Happened Next?</h3>

        <p>
        Military leaders often had to make decisions
        with incomplete information. Scouts, couriers,
        and local citizens all played important roles
        in gathering intelligence.
        </p>

        </div>
        `;
    }

    document
        .getElementById("dispatchResult")
        .innerHTML = response;

    document
        .getElementById("restartButton")
        .classList.remove("hidden");

}

function checkAnswer(choice){

    let result = "";

    if(choice === currentMessage.answer){

        result = `
        <div class="result">

        <h3>Correct Interpretation</h3>

        <p>
        The message reads:
        <strong>HINDMAN NEAR CANE HILL</strong>
        </p>

        <p>
        Intercepting and interpreting messages could
        reveal valuable information about enemy
        movements and intentions.
        </p>

        <h3>What Happened Next?</h3>

        <p>
        During the Prairie Grove Campaign, both armies
        relied heavily on scouts, couriers, cavalry
        patrols, and local intelligence to understand
        troop movements before the battle.
        </p>

        </div>
        `;
    }
    else{

        result = `
        <div class="result">

        <h3>Look Again</h3>

        <p>
        The clues already reveal:
        </p>

        <ul>
            <li>The first word is HINDMAN</li>
            <li>The final words are CANE HILL</li>
            <li>K becomes H, so letters are moving back three places</li>
        </ul>

        <p>
        Try another answer.
        </p>

        </div>
        `;

        document
            .getElementById("cipherResult")
            .innerHTML = result;

        return;
    }

    document
        .getElementById("cipherResult")
        .innerHTML = result;

    document
        .getElementById("restartButton")
        .classList.remove("hidden");

}
