const CRAZY_TIMEOUT_SECONDS = 20
let CRAZY_STARTED_ON = new Date()

const HUG_EMOJI = String.fromCodePoint(0x1F917)
const TROPHY_EMOJI = String.fromCodePoint(0x1F3C6)
const CLAP_EMOJI = String.fromCodePoint(0x1F44F)
const HI_EMOJI = String.fromCodePoint(0x1f44b)
const CONTACT_EMOJI = String.fromCodePoint(0x1f4e8)

crazyElapsedSeconds = function () {
    return (new Date().getTime() - CRAZY_STARTED_ON.getTime()) / 1000
}

changeCrazyText = function (text, subtext) {
    document.getElementById('crazy-text').innerHTML = text
    document.getElementById('crazy-subtext').innerHTML = subtext
}

changeBackgroundColor = function (color) {
    document.body.style.backgroundColor = color
}

let currentCrazyState = null
const changeCrazyState = function (id) {
    currentCrazyState = crazyStates.find(state => state.id === id)
    currentCrazyState.onEntry()
}

const crazyStates = [
    {
        id: 'init',
        onEntry: function () {
            changeCrazyText('*****', 'Ready?')
            changeBackgroundColor('#292929')
        },
        onKey: function (key) {
            if (key === 'g') {
                changeCrazyState('G')
            } else {
                changeCrazyState('error')
            }
        },
        onTimeout: function () {
            changeCrazyState('timeout')
        }
    },
    {
        id: 'error',
        onEntry: function () {
            changeCrazyText('*****', 'Wrong key! Please try again!')
            changeBackgroundColor('#FF0000')
        },
        onKey: function (key) {
            if (key === 'g') {
                changeCrazyState('G')
            } else {
                changeCrazyState('error')
            }
        },
        onTimeout: function () {
            changeCrazyState('timeout')
        }
    },
    {
        id: 'timeout',
        onEntry: function () {
            changeCrazyText('*****', 'Timeout! Please try again!')
            changeBackgroundColor('#FF0000')
        },
        onKey: function (key) {
            if (key === 'g') {
                changeCrazyState('G')
            } else {
                changeCrazyState('error')
            }
        },
        onTimeout: function () {
        }
    },
    {
        id: 'G',
        onEntry: function () {
            changeCrazyText('G****', 'Keep going ...')
            changeBackgroundColor('#292929')
        },
        onKey: function (key) {
            if (key === 'u') {
                changeCrazyState('GU')
            } else {
                changeCrazyState('error')
            }
        },
        onTimeout: function () {
            changeCrazyState('timeout')
        }
    },
    {
        id: 'GU',
        onEntry: function () {
            changeCrazyText('GU***', 'Getting closer ...')
            changeBackgroundColor('#292929')
        },
        onKey: function (key) {
            if (key === 'j') {
                changeCrazyState('GUJ')
            } else {
                changeCrazyState('error')
            }
        },
        onTimeout: function () {
            changeCrazyState('timeout')
        }
    },
    {
        id: 'GUJ',
        onEntry: function () {
            changeCrazyText('GUJ**', 'Almost there ...')
            changeBackgroundColor('#292929')
        },
        onKey: function (key) {
            if (key === 'd') {
                changeCrazyState('GUJD')
            } else {
                changeCrazyState('error')
            }
        },
        onTimeout: function () {
            changeCrazyState('timeout')
        }
    },
    {
        id: 'GUJD',
        onEntry: function () {
            changeCrazyText('GUJD*', 'One more key to win ...')
            changeBackgroundColor('#292929')
        },
        onKey: function (key) {
            if (key === 's') {
                changeCrazyState('GUJDS')
            } else {
                changeCrazyState('error')
            }
        },
        onTimeout: function () {
            changeCrazyState('timeout')
        }
    },
    {
        id: 'GUJDS',
        onEntry: function () {
            changeCrazyText(`Together Hacking Diversity ${HUG_EMOJI}`, `You cracked it! ${TROPHY_EMOJI} ${CLAP_EMOJI}`)
            changeBackgroundColor('#2900D2')
        },
        onKey: function (key) {
        },
        onTimeout: function () {
        }
    }
]

changeCrazyState('init')

window.setInterval(function () {
    if (crazyElapsedSeconds() > CRAZY_TIMEOUT_SECONDS) {
        CRAZY_STARTED_ON = new Date()
        currentCrazyState.onTimeout()
    }
}, 500)

window.addEventListener('keydown', event => {
    currentCrazyState.onKey(event.key.toLowerCase())
})

console.log(
    `${HI_EMOJI} Hi buddy, if you want to code crazy things with us, ${CONTACT_EMOJI} contact (talento@adevinta.com) us and we will tell you how!`
)
