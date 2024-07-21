export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const reqData = await req.json();

    if (!reqData.price || !reqData.userId) {
      return Response.json({ message: "Invalid request" }, { status: 400 });
    }

    console.log(reqData.price)

    const response = await fetch("https://api.lemonsqueezy.com/v1//checkouts", {
      method: "POST",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
      },
      body: JSON.stringify({
        data: {
          test_mode: true,
          type: "checkouts",
          attributes: {
            "custom_price": reqData.price.toString(),
            checkout_data: {
              custom: {
                user_id: reqData.userId,
              },
            },
          },
          relationships: {
            store: {
              data: {
                type: "stores",
                id: process.env.LEMON_SQUEEZY_STORE_ID?.toString(),
              },
            },
            variant: {
              data: {
                type: "variants",
                id: "456484",
              },
            },
          },
        },
      })
    });

    const data = await response.json();

    console.log(data);

    return Response.json({ data });
  } catch (error) {
    console.error(error);
    Response.json({ message: "An error occured" }, { status: 500 });
  }
}