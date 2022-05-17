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
    <>
      <div>お届け先情報</div>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-3">
            <form onSubmit={handleSubmit(orderBtn)}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        お名前
                      </label>
                      <input
                        type="text"
                        {...register("name", { required: true })}
                        name="name"
                        id="name"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      {errors.name && (
                        <p className="text-red-400">お名前を入力してください</p>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="emailaddress"
                        className="block text-sm font-medium text-gray-700"
                      >
                        メールアドレス
                      </label>
                      <input
                        type="text"
                        {...register("emailaddress", {
                          required: true,
                          pattern: /.+@.+/,
                        })}
                        name="emailaddress"
                        id="email-address"
                        autoComplete="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      {errors.emailaddress?.type === "required" && (
                        <p className="text-red-400">
                          メールアドレスを入力してください
                        </p>
                      )}
                      {errors.emailaddress?.type === "pattern" && (
                        <p className="text-red-400">
                          正しいメールアドレスを入力してください
                        </p>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-2">
                      <label
                        htmlFor="tell"
                        className="block text-sm font-medium text-gray-700"
                      >
                        携帯電話番号
                      </label>
                      <input
                        type="text"
                        {...register("tel", {
                          required: true,
                          pattern: /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/,
                        })}
                        name="tel"
                        id="tel"
                        autoComplete="tel"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      {errors.tel?.type === "required" && (
                        <p className="text-red-400">
                          携帯電話番号を入力してください
                        </p>
                      )}
                      {errors.tel?.type === "pattern" && (
                        <p className="text-red-400">
                          XXX-XXXX-XXXXの形式で入力してください
                        </p>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="postalcode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        郵便番号
                      </label>
                      <input
                        type="text"
                        {...register("postalcode", {
                          required: true,
                          pattern: /^[0-9]{3}-[0-9]{4}$/,
                        })}
                        name="postalcode"
                        id="postal-code"
                        autoComplete="postal-code"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      {errors.postalcode?.type === "required" && (
                        <p className="text-red-400">
                          郵便番号を入力してください
                        </p>
                      )}
                      {errors.postalcode?.type === "pattern" && (
                        <p className="text-red-400">
                          XXX-XXXXの形式で入力してください
                        </p>
                      )}
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        住所
                      </label>
                      <input
                        type="text"
                        {...register("address", { required: true })}
                        name="address"
                        id="street-address"
                        autoComplete="street-address"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      {errors.address && (
                        <p className="text-red-400">住所を入力してください</p>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        配達希望日
                      </label>
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
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm border-gray-300 rounded-md"
                      />
                      {errors.date?.type === "required" && (
                        <p className="text-red-400">
                          配達希望日を選択してください
                        </p>
                      )}
                      {errors.date?.type === "validate" && (
                        <p className="text-red-400">
                          明日以降の日付を選択してください
                        </p>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="time"
                        className="block text-sm font-medium text-gray-700"
                      >
                        配達希望時間
                      </label>
                      <select
                        id="time"
                        {...register("time", { required: true })}
                        autoComplete="time"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                    </div>

                    <div className="col-span-6 lg:col-span-2"></div>

                    <div className="col-span-6 sm:col-span-2">
                      <label
                        htmlFor="paymethod"
                        className="block text-sm font-medium text-gray-700"
                      >
                        お支払い方法
                      </label>
                      <select
                        id="paymethod"
                        {...register("paymethod", { required: true })}
                        autoComplete="paymethod"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value="1">代金引換</option>
                        <option value="2">クレジットカード</option>
                      </select>
                    </div>

                    {watch("paymethod") === "2" && (
                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          htmlFor="card"
                          className="block text-sm font-medium text-gray-700"
                        >
                          クレジットカード番号
                        </label>
                        <input
                          type="text"
                          {...register("card", {
                            required: true,
                            pattern: /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/,
                          })}
                          name="card"
                          id="card"
                          autoComplete="card"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                        {errors.card?.type === "required" && (
                          <p className="text-red-400">
                            クレジットカード番号を入力してください
                          </p>
                        )}
                        {errors.card?.type === "pattern" && (
                          <p className="text-red-400">
                            XXXX-XXXX-XXXX-XXXXの形式で入力してください
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <Btn
                    classname="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    text="注文する"
                    onClick={handleSubmit(orderBtn)}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
