console.log('LOADED SCRIPT')

document.querySelector('button#toast').addEventListener('click', () => {
  Android.toast('Toast from JS')
})

document.querySelector('button#async').addEventListener('click', async () => {
  const data = await Android.exampleAsyncApi()
  document.querySelector('#async-out').textContent = JSON.stringify(data, null, 2)
})
