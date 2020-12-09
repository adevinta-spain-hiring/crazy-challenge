const CRAZY_TIMEOUT_SECONDS = 20
let CRAZY_STARTED_ON = new Date()

const CRAZY_EMOJI = String.fromCodePoint(0x1f92a)
const HI_EMOJI = String.fromCodePoint(0x1f44b)
const CONTACT_EMOJI = String.fromCodePoint(0x1f4e8)

crazyElapsedSeconds = function () {
  return (new Date().getTime() - CRAZY_STARTED_ON.getTime()) / 1000
}

changeCrazyText = function (text) {
  document.getElementById('crazy-text').innerHTML = text
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
      changeCrazyText('Ready?')
      changeBackgroundColor('#292929')
    },
    onKey: function (key) {
      if (key === 't') {
        changeCrazyState('T')
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
      changeCrazyText('Wrong key! Please try again!')
      changeBackgroundColor('#FF0000')
    },
    onKey: function (key) {
      if (key === 't') {
        changeCrazyState('T')
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
      changeCrazyText('Timeout! Please try again!')
      changeBackgroundColor('#FF0000')
    },
    onKey: function (key) {
      if (key === 't') {
        changeCrazyState('T')
      } else {
        changeCrazyState('error')
      }
    },
    onTimeout: function () {}
  },
  {
    id: 'T',
    onEntry: function () {
      changeCrazyText('Together ...')
      changeBackgroundColor('#D2CB00')
    },
    onKey: function (key) {
      if (key === 'c') {
        changeCrazyState('TC')
      } else {
        changeCrazyState('error')
      }
    },
    onTimeout: function () {
      changeCrazyState('timeout')
    }
  },
  {
    id: 'TC',
    onEntry: function () {
      changeCrazyText('Together Creating ...')
      changeBackgroundColor('#00D2CB')
    },
    onKey: function (key) {
      if (key === 'c') {
        changeCrazyState('TCC')
      } else {
        changeCrazyState('error')
      }
    },
    onTimeout: function () {
      changeCrazyState('timeout')
    }
  },
  {
    id: 'TCC',
    onEntry: function () {
      changeCrazyText('Together Creating Craziness ' + CRAZY_EMOJI)
      changeBackgroundColor('#2900D2')
    },
    onKey: function (key) {},
    onTimeout: function () {}
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
  `${HI_EMOJI} Hi buddy, if you want to see how we develop crazy things, ${CONTACT_EMOJI} contact us and we will tell you how!`
)
