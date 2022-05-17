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
      } else {
        // @ts-ignore
        dispatch(addCart(cart, user.uid, [cartItem]));
      }
    } else {
      if (Object.keys(cart).length === 0) {
        let newcart = {
          iteminfo: [cartItem],
          status: 0,
        };
        dispatch(setCart(newcart));
      } else {
        let newcart: Carttype = JSON.parse(JSON.stringify(cart));
        if (newcart.iteminfo) {
          newcart.iteminfo.push(cartItem);
          dispatch(setCart(newcart));
        }
      }
    }
  };
  return (
    <div>
      <h2>{props.item.name}</h2>
      <Image
        src={`/${props.item.img}`}
        alt="itemDetail"
        width={400}
        height={400}
        className="rounded-lg"
      />
      <p>{props.item.des}</p>
      <p>サイズ</p>
      <label>
        <input
          type="radio"
          value="M"
          onChange={(e) => setSize(e.target.value)}
          checked={size === "M"}
        />
        <span>M</span>
        {props.item.pm && <Price price={props.item.pm} />}
      </label>
      <label>
        <input
          type="radio"
          value="L"
          onChange={(e) => setSize(e.target.value)}
          checked={size === "L"}
        />
        <span>L</span>
        {props.item.pl && <Price price={props.item.pl} />}
      </label>
      <p>
        数量：
        <select onChange={(e) => setBuynum(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </p>
      <p>
        ご注文金額　合計：
        {total && <Price price={total} />}
      </p>
      <Btn
        text="カートに入れる"
        classname="flex items-center shadow border-blue-500 border-2 rounded-full  px-4 py-2 text-blue-500 hover:bg-blue-500 hover:text-white"
        onClick={addCartBtn}
      />
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
