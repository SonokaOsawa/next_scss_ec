import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Btn from "../atom/Btn";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../../features/cart";
import { Ordertype, order } from "../../features/order";
import { useRouter } from "next/router";

interface Inputs {
  name: string;
  emailaddress: string;
  postalcode: string;
  address: string;
  tel: string;
  date?: string;
  time?: string;
  paymethod?: string;
  card?: string;
}

export const OrderForm: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  // @ts-ignore
  const total = cart.iteminfo.reduce((a, b) => a + b.price, 0);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      emailaddress: "",
      postalcode: "",
      address: "",
      tel: "",
      date: "",
      time: "10",
      paymethod: "1",
      card: "",
    },
  });
  const today = new Date();
  const year = today.getFullYear();
  let month = "";
  if (1 + today.getMonth() - 10 >= 0) {
    month = String(1 + today.getMonth());
  } else if (1 + today.getMonth() - 10 < 0) {
    month = "0" + (1 + today.getMonth());
  }
  let day = "";
  if (today.getDate() - 10 >= 0) {
    day = String(today.getDate());
  } else if (today.getDate() - 10 < 0) {
    day = "0" + today.getDate();
  }
  const hour = today.getHours();
  const minut = today.getMinutes();
  const orderDate = Number(year + month + day);
  const orderTime = year + "-" + month + "-" + day + "-" + hour + ":" + minut;
  const [date, setDate] = useState("");
  const selectedDate = new Date(date);
  const selestedYear = selectedDate.getFullYear();
  let selectedMonth = "";
  if (1 + selectedDate.getMonth() - 10 >= 0) {
    selectedMonth = String(1 + selectedDate.getMonth());
  } else if (1 + selectedDate.getMonth() - 10 < 0) {
    selectedMonth = "0" + (1 + selectedDate.getMonth());
  }
  let selectedDay = "";
  if (selectedDate.getDate() - 10 >= 0) {
    selectedDay = String(selectedDate.getDate());
  } else if (selectedDate.getDate() - 10 < 0) {
    selectedDay = "0" + selectedDate.getDate();
  }
  const selDate = Number(selestedYear + selectedMonth + selectedDay);
  const orderBtn: SubmitHandler<Inputs> = (data) => {
    console.log(today.getTime());
    const orderinfo: Ordertype = {
      id: cart.id,
      uid: cart.uid,
      status: 1,
      iteminfo: cart.iteminfo,
      name: data.name,
      email: data.emailaddress,
      zipcode: data.postalcode,
      address: data.address,
      tel: data.tel,
      orderdate: orderTime,
      deliveryDate: data.date,
      deliveryTime: data.time,
      paymethod: data.paymethod,
      card: data.card,
      totalPrice: total,
      timestamp: today.getTime(),
    };
    // @ts-ignore
    dispatch(order(orderinfo));
    router.push("/ordercomplete");
  };

  return (
    <div className="orderformbody">
      <div className="ordertitle">お届け先情報</div>
      <form onSubmit={handleSubmit(orderBtn)}>
        <table className="orderformtable">
          <tbody>
            <tr className="ordercontent">
              <th className="orderitem">お名前</th>
              <td className="ordercontent">
                <input
                  type="text"
                  {...register("name", { required: true })}
                  name="name"
                  id="name"
                  autoComplete="given-name"
                  className="formtext"
                />
                <br />
                {errors.name && <span>お名前を入力してください</span>}
              </td>
            </tr>
            <tr className="ordercontent">
              <th className="orderitem">メールアドレス</th>
              <td className="ordercontent">
                <input
                  type="text"
                  {...register("emailaddress", {
                    required: true,
                    pattern: /.+@.+/,
                  })}
                  name="emailaddress"
                  id="email-address"
                  autoComplete="email"
                  className="formtext"
                />
                <br />
                {errors.emailaddress?.type === "required" && (
                  <span>メールアドレスを入力してください</span>
                )}
                {errors.emailaddress?.type === "pattern" && (
                  <span>正しいメールアドレスを入力してください</span>
                )}
              </td>
            </tr>
            <tr className="ordercontent">
              <th className="orderitem">携帯電話番号</th>
              <td className="ordercontent">
                <input
                  type="text"
                  {...register("tel", {
                    required: true,
                    pattern: /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/,
                  })}
                  name="tel"
                  id="tel"
                  autoComplete="tel"
                  className="formtext"
                />
                <br />
                {errors.tel?.type === "required" && (
                  <span>携帯電話番号を入力してください</span>
                )}
                {errors.tel?.type === "pattern" && (
                  <span>XXX-XXXX-XXXXの形式で入力してください</span>
                )}
              </td>
            </tr>
            <tr className="ordercontent">
              <th className="orderitem">郵便番号</th>
              <td className="ordercontent">
                <input
                  type="text"
                  {...register("postalcode", {
                    required: true,
                    pattern: /^[0-9]{3}-[0-9]{4}$/,
                  })}
                  name="postalcode"
                  id="postal-code"
                  autoComplete="postal-code"
                  className="formtext"
                />
                <br />
                {errors.postalcode?.type === "required" && (
                  <span>郵便番号を入力してください</span>
                )}
                {errors.postalcode?.type === "pattern" && (
                  <span>XXX-XXXXの形式で入力してください</span>
                )}
              </td>
            </tr>
            <tr className="ordercontent">
              <th className="orderitem">住所</th>
              <td className="ordercontent">
                <input
                  type="text"
                  {...register("address", { required: true })}
                  name="address"
                  id="street-address"
                  autoComplete="street-address"
                  className="formtext"
                />
                <br />
                {errors.address && <span>住所を入力してください</span>}
              </td>
            </tr>
            <tr className="ordercontent">
              <th className="orderitem">配達希望日</th>
              <td className="ordercontent">
                <input
                  type="date"
                  {...register("date", {
                    required: true,
                    validate: () => orderDate - selDate < 0,
                  })}
                  name="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="formselect"
                />
                <br />
                {errors.date?.type === "required" && (
                  <span>配達希望日を選択してください</span>
                )}
                {errors.date?.type === "validate" && (
                  <span>明日以降の日付を選択してください</span>
                )}
              </td>
            </tr>
            <tr className="ordercontent">
              <th className="orderitem">配達希望時間</th>
              <td className="ordercontent">
                <select
                  id="time"
                  {...register("time", { required: true })}
                  autoComplete="time"
                  className="formselect"
                >
                  <option value="10">10:00</option>
                  <option value="11">11:00</option>
                  <option value="12">12:00</option>
                  <option value="13">13:00</option>
                  <option value="14">14:00</option>
                  <option value="15">15:00</option>
                  <option value="16">16:00</option>
                  <option value="17">17:00</option>
                  <option value="18">18:00</option>
                </select>
              </td>
            </tr>
            <tr className="ordercontent">
              <th className="orderitem">お支払い方法</th>
              <td className="ordercontent">
                <select
                  id="paymethod"
                  {...register("paymethod", { required: true })}
                  autoComplete="paymethod"
                  className="formselect"
                >
                  <option value="1">代金引換</option>
                  <option value="2">クレジットカード</option>
                </select>
              </td>
            </tr>

            {watch("paymethod") === "2" && (
              <tr className="ordercontent">
                <th className="orderitem">クレジットカード番号</th>
                <td className="ordercontent">
                  <input
                    type="text"
                    {...register("card", {
                      required: true,
                      pattern: /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/,
                    })}
                    name="card"
                    id="card"
                    autoComplete="card"
                    className="formtext"
                  />
                  <br />
                  {errors.card?.type === "required" && (
                    <span>クレジットカード番号を入力してください</span>
                  )}
                  {errors.card?.type === "pattern" && (
                    <span>XXXX-XXXX-XXXX-XXXXの形式で入力してください</span>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div>
          <Btn
            classname="orderbutton"
            text="注文する"
            onClick={handleSubmit(orderBtn)}
          />
        </div>
      </form>
    </div>
  );
};
