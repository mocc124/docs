# 

TS已成为一种趋势，越来越多的框架开始使用它。

起步安装 `npm install typescript -g`

转义ts文件 `tsc 文件名`

推荐在学习阶段，使用[TypeScript: 演练场](https://www.typescriptlang.org/zh/play#example/javascript-playgrounds)

## 第一章 基础类型

基础类型：Boolean、Number、String、null、undefined 以及 ES6 的 Symbol 和 ES10 的 BigInt。

1. string 类型定义:
    ```ts
    let str:string = "";
    let muban:string = `web ${str}`;
    
    let number:string = 123; // err: Type 'number' is not assignable to type 'string'.
    ```
2. number 类型定义:
    ```ts
    let num:number = 112;
    let infinityNumber:number = Infinity;
    let notANum:number = NaN;
    // 支持十六进制、十进制、八进制和二进制；
    let decimal: number = 6;
    let hex: number = 0xf00d;
    let binary: number = 0b1010;
    let octal: number = 0o744;
    ```
3. 布尔类型：
    ```ts
    let booleand: boolean = true //可以直接使用布尔值
    let booleand2: boolean = Boolean(1) // 接受 Boolean函数返回的布尔值
    ```
   注意点,使用构造函数 Boolean 创造的对象不是布尔值,而是一个 Boolean 对象
    ```ts
    let createdBoolean:boolean = new Boolean(1) // err: Type 'Boolean' is not assignable to type 'boolean'.
    let createdBoolean2:Boolean = new Boolean(1)
    ```
4. Null和undefined类型
    ```ts
    let u: undefined = undefined;// 定义undefined
    let n: null = null;// 定义null
    ```
   void 和 undefined 和 null 最大的区别：

5. 空值类型（JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数，这也是最常见的用法）
    ```ts
    // 表示此函数无返回值
    function voidFn(): void {
        console.log('test void')
    }
   
    // 申明为 void 类型的变量，只能赋予 undefined 和 null
    let unusable: void = undefined;
    ```
   除了上面一种显式指定函数返回值为void的情况外，还有三种情况会隐式返回void
   - 函数没写 return
   - 只写了 return， 没有具体的返回值
   - return undefined;

   P.S. void 和 undefined 和 null 最大的区别？？？

   非严格模式下（TS默认开启），undefined 和 null 是所有类型的子类型。也就是说 undefined/null 类型的变量，可以赋值给 string 类型的变量，void是不可以的。

## 第二章 任意类型

声明为 any 类型的变量（变量不指定类型默认为 any）不会被类型检查，可以赋任意值，但这样也就失去了TS类型检测的作用，需要小心使用。

```ts
let anys:any = 123
anys = '123'
anys = true
```
TypeScript 3.0 引入了 unknown 类型，也被认为是 top type（顶级类型），但它更安全。

两者的区别：
```ts
// 1. unknow类型不能作为子类型只能作为父类型 any可以作为父类型和子类型（也就是说 unknow 不能放在赋值操作符右边）

let namesUn:unknown = 'abc'
let namesAn:any = 'ABC'

let newName:string = ""

newName = namesAn
newName = namesUn // err: Type 'unknown' is not assignable to type 'string'.
 
// 2. unknown 可赋值对象只有 unknown 和 any，any可以为任意类型赋值
let un:unknown = namesUn
let an:any= namesUn

// 3. unknown 类型不能去调用属性和方法
let any:any = {a:1}
any.a // 1

let unObj:unknown = {b:1,ccc:():number=>213}
unObj.b // err: 'unObj' is of type 'unknown'.
unObj.ccc() // err: 'unObj' is of type 'unknown'.
```

## 第三章 接口和对象类型

### object、Object以及{}三个类型
Object（大写的O），TS中表示所有的类型，所有的原始类型以及对象类型都指向这个Object，可以是被任意类型赋值
```ts
let objNum:Object = 12
let objBool:Object = true
let objArr:Object = []
```
object，表示非原始类型的一个类型，一般常用于泛型约束
```ts
let obj:object = []
let obj1:object = {}
let obj2:object = ()=>{}

let obj4:object = true // err: 布尔值是原始类型
```
{}，字面量模式，可以理解为`new Object`,与 Obejct 类似，可以被赋值为任何类型
```ts
let obj:{} = []
let obj1:{} = {}
let obj2:{} = ()=>{}
let obj3:{} = true
let obj4:{} = 100
```
注意：字面量模式被赋值为对象类型后无法修改
```ts
let obj:{} = {a:1,b:2}
obj.a = 99 // Property 'a' does not exist on type '{}'.
console.log(obj)
```
### 接口和对象类型







