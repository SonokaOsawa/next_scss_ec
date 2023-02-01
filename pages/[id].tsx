import { useState } from "react";
import { Itemtype } from "../features/items";
import {
  Carttype,
  newCart,
  selectCart,
  addCart,
  setCart,
  Iteminfotype,
} from "../features/cart";
import Image from "next/image";
import Btn from "../components/atom/Btn";
import Price from "../components/atom/Price";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import { selectUser } from "../features/user";
import { useDispatch, useSelector } from "react-redux";
import firebase from "../firebase/firebaseConfig";

interface Props {
  item: Itemtype;
}

const Itemdetail: NextPage<Props> = (props) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);
  const [size, setSize] = useState("M");
  const [buyNum, setBuynum] = useState("1");
  let total = props.item.pm;
  if (size === "M" && props.item.pm) {
    total = props.item.pm * Number(buyNum);
  } else if (props.item.pl) {
    total = props.item.pl * Number(buyNum);
  }
  const addCartBtn = () => {
    let cartItem: Iteminfotype = {
      id: new Date().getTime().toString(16),
      itemId: props.item.id,
      buynum: Number(buyNum),
      size: size,
      price: total,
    };
    if (user.uid) {
      if (Object.keys(cart).length === 0) {
        // @ts-ignore
        dispatch(newCart([cartItem], user.uid));
        alert("カートに追加しました。");
      } else {
        // @ts-ignore
        dispatch(addCart(cart, user.uid, [cartItem]));
        alert("カートに追加しました。");
      }
    } else {
      if (Object.keys(cart).length === 0) {
        let newcart = {
          iteminfo: [cartItem],
          status: 0,
        };
        dispatch(setCart(newcart));
        alert("カートに追加しました。");
      } else {
        let newcart: Carttype = JSON.parse(JSON.stringify(cart));
        if (newcart.iteminfo) {
          newcart.iteminfo.push(cartItem);
          dispatch(setCart(newcart));
          alert("カートに追加しました。");
        }
      }
    }
  };
  return (
    <div className="itemdetailbody">
      <h2 className="itemdetailname">{props.item.name}</h2>
      <div className="wrapper">
        <div className="position">
          <Image
            src={`/${props.item.img}`}
            alt="itemDetail"
            className="detailimage"
            fill
            sizes="(max-width: 400px) 100vw"
            priority
          />
        </div>
        <div className="seconditem">
          <div className="itemdes">{props.item.des}</div>
          <div className="title">サイズ</div>
          <input
            type="radio"
            value="M"
            checked={size === "M"}
            onChange={(e) => setSize(e.target.value)}
          />
          <label className="radio" onClick={(size) => setSize("M")}>
            <span>M </span>
            {props.item.pm && <Price price={props.item.pm} />}
          </label>

          <input
            type="radio"
            value="L"
            checked={size === "L"}
            onChange={(e) => setSize(e.target.value)}
          />
          <label className="radio" onClick={(size) => setSize("L")}>
            <span>L </span>
            {props.item.pl && <Price price={props.item.pl} />}
          </label>
          <div className="title">数量</div>
          <div className="selectwrapper">
            <select
              onChange={(e) => setBuynum(e.target.value)}
              className="select"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="title">
            ご注文金額　合計：
            {total && <Price price={total} />}
          </div>
          <Btn
            text="カートに入れる"
            classname="cartbutton"
            onClick={addCartBtn}
          />
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async (
  context: GetStaticPropsContext
) => {
  let items: Itemtype[] = [];
  const ref = await firebase.firestore().collection("items").get();
  ref.docs.map((doc) => {
    const data = {
      id: doc.data().id,
      name: doc.data().name,
      des: doc.data().des,
      pm: doc.data().pm,
      pl: doc.data().pl,
      img: doc.data().img,
    };
    items.push(data);
  });
  let itemid: number;
  if (context.params) {
    itemid = Number(context.params.id);
  }
  let item: Itemtype = {};
  items.forEach((i) => {
    if (i.id === itemid) {
      item = i;
    }
  });
  return {
    props: {
      item,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  let items: any[] = [];
  let paths = [];
  const ref = await firebase.firestore().collection("items").get();
  ref.docs.map((doc) => {
    const data = {
      id: doc.data().id,
    };
    items.push(data);
  });
  paths = items.map((item) => ({
    params: { id: item.id.toString() },
  }));
  return {
    paths: paths,
    fallback: false,
  };
};

export default Itemdetail;
