// http://abcinblog.blogspot.com/2018/05/javascript-promise.html
// http://thecodebarbarian.com/write-your-own-node-js-promise-library-from-scratch.html
class MyPromise {                 // в области видимости class ведёт себя как let
  constructor( executor ) {
    this._status = 'pending'
    this._value = null         // сохраняю значения чтобы воспользоватся ими в ф-ии
    this._reason = null       //
//  в оригинале есть массив со всеми обещаниями
    const resolve = ( value ) => {
      this._status = 'fulfilled'
      this._value = value
      return MyPromise.resolve(value)
    }

    const reject = ( reason ) => {    
      this._status = 'rejected'
      this._reason = reason
      return MyPromise.reject(reason)
    }
    executor(resolve, reject)
  }

  then(onFulfilled, onRejected) {     
    // через this терятся значение value
    if (this._status === 'fulfilled') 
      // console.log("onFulfilled IN THEN AFTER IF -:-", onFulfilled )
      onFulfilled
      return MyPromise.resolve( onFulfilled(MyPromise._value) )

    if (this._status === 'rejected')
      onRejected 
      return MyPromise.reject( onRejected(MyPromise._reason) )
  }

// Ошибки выброшеные из асинхронных функций не будут пойманы методом catch
  catch(onRejected) {                      
    try {
      throw new Error(err)
    } catch (err) {
      console.log(`Ошибка: ${err}`)
    }
  } 

  finally( fn ) { return fn() }

  static resolve(value) {
    this._value = value 
    return new MyPromise( value => value )
  }

  static reject(reason) {
    this._reason = reason
    return new MyPromise( reason => reason )
  }

  // static all([p1, p2, p3]) {
  //   [].map(p => if (p._status === 'fulfilled') return [].push(p) )
  //   // если одно из обещаний будет отклонено, вернётся отмена , то есть вызов reject
  // }
  
  
  static race() {}

}

const promise = new MyPromise( ( res, rej ) => rej(5) )
// promise.then( x => console.log(x) ).catch( err => err )
promise
  .then( a => a * a)
  .then(r => r * r)
  .then( x => console.log('AFTER ALL', x ) )
  .catch( err => err )

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