const URL = './ZonAnn.Ts+dSST.csv'
const getData = async () => {
  const years = []
  const globalTemperature = []
  const northHemiTemperature = []
  const southHemiTemperature = []
  const response = await fetch(URL)
  const data = await response.text()
  const table = data.split('\n').splice(2)
  table.forEach((row) => {
    const column = row.split(',')
    years.push(column[0])
    globalTemperature.push(parseFloat(column[1]) + 14)
    northHemiTemperature.push(parseFloat(column[2]) + 14)
    southHemiTemperature.push(parseFloat(column[3]) + 14)
  })
  return {
    years,
    globalTemperature,
    northHemiTemperature,
    southHemiTemperature,
  }
}
const graph = async () => {
  const data = await getData()
  const ctx = document.getElementById('chart').getContext('2d')
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.years,
      datasets: [
        {
          label: 'Mean temperature',
          data: data.globalTemperature,
          backgroundColor: ['rgba(255, 99, 132, 0.2)'],
          borderColor: ['rgba(255, 99, 132, 1)'],
          borderWidth: 1,
        },
        {
          label: 'Northern Hemisphere temperature',
          data: data.northHemiTemperature,
          backgroundColor: ['rgba(100, 255, 150, 0.2)'],
          borderColor: ['rgba(100, 255, 150, 1)'],
          borderWidth: 1,
        },
        {
          label: 'Northern Hemisphere temperature',
          data: data.southHemiTemperature,
          backgroundColor: ['rgba(100, 155, 255, 0.2)'],
          borderColor: ['rgba(100, 155, 255, 1)'],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          ticks: {
            // Include a dollar sign in the ticks

            callback: function (value, index, ticks) {
              value = Math.floor(value)
              return value + '°'
            },
          },
        },
      },
    },
  })
}
graph()
