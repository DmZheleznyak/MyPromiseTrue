// http://abcinblog.blogspot.com/2018/05/javascript-promise.html
// http://thecodebarbarian.com/write-your-own-node-js-promise-library-from-scratch.html
class MyPromise {                 // в области видимости class ведёт себя как let
  constructor( executor ) {
    this._status = 'pending'
    this._value =  null     // сохраняю значения чтобы воспользоватся ими в ф-ии
    this._reason = null

    const _resolve = value => {
      this._status = 'fulfilled'
      this._value = value
    }

    const _reject = reason => {
      this._status = 'rejected'
      this._reason = reason      
    }       

    executor(_resolve, _reject)
  }

  then(onFulfilled, onRejected) {     
    if( this._status === "fulfilled") {
      try {
        this._value = onFulfilled( this._value ) 
        console.log( this._value )
        return this
      } catch(err) { 
        // this._reason = onRejected( err )
        // this.catch(onRejected)
        // return this
      }
    }

    if ( this._status === 'rejected') {
      console.log("onRejected when status rejected", onRejected)
      this._reason = onRejected( this._reason )
      return this
    }
    
  }

  catch(onRejected) {
    console.log(onRejected)                   
    this.then(null , onRejected(this._reason))
  }
}

const promise = new Promise( ( res, rej ) => {
    setTimeout( () => res( 88 ) ,1001 )
  })

console.log(promise)

promise
  .then(r => {
    r * r
    throw new Error()
  })
  .catch( err => console.log( err ))
  .then(r => r * r)
  .then( x => console.log('AFTER ALL', x ) )
  .catch( err => console.log(err) )  // <- здесь прописываем обработчик ошибки
 

// MyPromise.resolve("hello")

// function showName(name) {
// 	if (name !== 'Dima') {
// 		throw new Error('Gde Dima?')
// 	}
	
// 	alert('Zdarova Dimon!');
//  }
 
//  try {
// 	showName('Dima');
//  } catch (err) {
// 	 alert(`Произошла какая-то ошибка с сообщением: ${err.message}`)
//  }

// promise.then( a => a + 2 ).then(x=>console.log(x))
// function myPromise() {}
// pr = new myPromise((res, rej) => {
//   res(5)
// })
// pr.then( a => console.log(a))

// promise.then( a => a + 2 ).then(x=>console.log(x))
// function myPromise() {}
// pr = new myPromise((res, rej) => {
//   res(5)
// })
// pr.then( a => console.log(a))

// Promise.reject() - возвращает отклоненное обещание.
// Promise.resolve() - возвращает разрешенное обещание.
// Promise.race() - берет массив (или любой итерабельный) и возвращает обещание, 
// 									которое разрешает со значением первого разрешенного обещания в итерируемом, 
// 									или отклоняет по причине первого обещания, которое отвергается.
// Promise.all() - берет массив (или любой итерабельный) и возвращает обещание, 
// 								которое разрешает, когда все обещания в итерируемом аргументе разрешаются, 
// 								или отклоняется по причине первого обещанного обещания, которое отклоняет.