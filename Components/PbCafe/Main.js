//import all scss files
import { menuItems } from '../../utils/PbCafeAssets';
import { useState, useMemo } from 'react';
import PbFeatured from './PbFeatured';
import PbAbout from './PbAbout';

function Main() {
  const [currentPage, setCurrentPage] = useState("home");
  const [visitedPages, setVisitedPages] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const tax_rate = 0.07;
  const [addedToCart, setAddedToCart] = useState(false);
  const [qty, setQty] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [scrollYPosition, setScrollYPosition] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const letters = ["P", "B", "'S ", "", "C", "A", "F", "E"];
  const [lastSelection, setLastSelection] = useState("");


  // Generate order ID
  const generateOrderId = () => `ORD-${Date.now()}`;

  // Group menu items by type
  const { groupedItems, menuTypes } = useMemo(() => {
    const grouped = menuItems.reduce((acc, item) => {
      acc[item.type] = acc[item.type] || [];
      acc[item.type].push(item);
      return acc;
    }, {});
    return {
      groupedItems: grouped,
      menuTypes: Object.keys(grouped),
    };
  }, [menuItems]);
  // Navigation links
  const menuNav = useMemo(() => (
    <nav>
      <ul>
        {menuTypes.map((type) => (
          <li key={type}>
            <a
              href={`#${type}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(type);
              }}
            >
              {type.toLowerCase()}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  ), [menuTypes]);

  // Select item
  const handleItemClick = (item) => {
    const itemElement = document.getElementById(`menu-item-${item.id}`);
    if (itemElement) {
      const y = itemElement.getBoundingClientRect().top + window.pageYOffset - 100;
      setScrollYPosition(y);
    }

    setSelectedItem(item);
    setLastSelection(item.name);
    switchPages("item-details");
  };

  //switch pages
  const switchPages = (page, fromHomeIcon = false) => {
    setCurrentPage(page);
    if (currentPage === 'place-order') {

    }
    if (fromHomeIcon) window.scrollTo(0, 0);
    if (currentPage === 'orderconfirmation') {
      setOrderId(generateOrderId());
      setCartItems([]);
      setVisitedPages([]);
    }
    if (selectedItem?.name) {
      setLastSelection(selectedItem.name);
    }
    setVisitedPages(prevPages => {
      if (!prevPages.includes(page)) {
        return [...prevPages, page];
      }
      return prevPages;
    });

  };

  //scroll to item type
  const scrollToSection = (type) => {
    const section = document.getElementById(type);
    if (section) {
      const yOffset = -200;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  //home content 
  const getHome = () => {
    return (
      <div className="pb-home-content">
        <div className="half-circle">
          {letters.map((letter, index) => (
            <div className="letter" key={index}>{letter}</div>
          ))}
          <img className="pb-logo" src="PbCafe/shopping.png" alt="logo" />
        </div>
        <div className="pb-links">
          <nav>
            <ul>
              <li><a onClick={() => switchPages('order')}>order</a></li>
              <li><a>menu</a></li>
              <li><a>about</a></li>
            </ul>
          </nav>
        </div>
      </div>
    );
  };

  //breadcrumbs
  const getBreadCrumb = () => {
    return (
      <nav className="pb-breadcrumbs">
        <li onClick={() => switchPages("home")}>
          Home {'>'}
        </li>

        {visitedPages.includes("order") && (
          <li onClick={() => switchPages("order")}>
            Menu {'>'}
          </li>
        )}

        {visitedPages.includes("item-details") && (
          <li onClick={() => switchPages("item-details")}>
            {selectedItem?.name || "Item"} {'>'}
          </li>
        )}

        {visitedPages.includes("placeorder") && (
          <li onClick={() => switchPages("place-order")}>
            Back to Shopping Cart {'>'}
          </li>
        )}
      </nav>
    );
  };

  //render menu 
  const getMenu = () => {
    return (
      <div className="pb-order-page">
        <div className="pb-mobilenav-wrapper" style={{
          backgroundColor: currentPage === 'order' ? 'transparent' : currentPage === 'home' ? '#ffd66e' : 'defaultColor'
        }}>
          <button
            className={`pb-hamburger-button ${isOpen ? 'active' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
          </button>

          <div className={`pb-hamburger-menu ${isOpen ? 'active' : ''}`}>
            {menuNav}
          </div>
          <div className="pb-nav-wrapper">{menuNav}</div>
        </div>

        <div className="pb-order-container">
          {Object.keys(groupedItems).map((type) => (
            <div key={type} id={type} className="pb-menu-group">
              <h1>{type}</h1>
              <div className="pb-menu-items">
                {groupedItems[type].map((item) => (
                  <div
                    key={item.id}
                    id={`menu-item-${item.id}`}
                    className="pb-menu-item"
                  >
                    <div
                      className="pb-menu-card"
                      onClick={() => handleItemClick(item)}
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        className="pb-menu-img"
                      />
                    </div>
                    <div className="pb-menu-name">
                      {item.name.toLowerCase()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  };

  //Get quantity
  const handleQty = (action) => {
    setQty(prevQty => action === 'increase' ? prevQty + 1 : (prevQty > 1 ? prevQty - 1 : prevQty));
  };
  const updateQty = (id, delta) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id !== id) return item;

        const newQty = item.qty + delta;
        console.log("Clicked", item.name, "New qty:", newQty);

        //user message
        if (newQty < 1) {
          setItemToRemove(item);
          setIsModalOpen(true);
          return item;
        }

        const unitPrice = Number(item.totalCost) / Number(item.qty);
        const newTotalCost = unitPrice * newQty;

        return {
          ...item,
          qty: newQty,
          totalCost: newTotalCost
        };
      });
    });
  };
  //add to cart
  const handleAddToCart = () => {
    if (selectedItem) {
      setCartItems((prevCartItems) => {
        const existingItemIndex = prevCartItems.findIndex(item => item.id === selectedItem.id);

        if (existingItemIndex !== -1) {
          const updatedCartItems = [...prevCartItems];
          updatedCartItems[existingItemIndex] = {
            ...updatedCartItems[existingItemIndex],
            qty: updatedCartItems[existingItemIndex].qty + qty,
            totalCost: updatedCartItems[existingItemIndex].totalCost + (selectedItem.cost * qty),
          };
          return updatedCartItems;
        } else {
          return [
            ...prevCartItems,
            {
              ...selectedItem,
              qty: qty,
              totalCost: selectedItem.cost * qty,
            },
          ];
        }
      });

      setQty(1);
      setCurrentPage('order');
      setAddedToCart(true);
      scrollToSection(selectedItem.type);
    }
  };
  // remove cart item 
  const removeItemFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };
  const handleRemoveItem = (id) => {
    removeItemFromCart(id);
  };
  const handleConfirmDelete = (itemId) => {
    removeItemFromCart(itemId);
    setIsModalOpen(false);
    setItemToRemove(null);
  };
  //user message
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setItemToRemove(null);
  };

  const getPlaceConfirmOrder = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.totalCost, 0);
    const tax = subtotal * tax_rate;
    const total = subtotal + tax;

    return (
      <div className="pb-placeorder-container">
        {currentPage === 'place-order' ? (
          <>
            <h1>Confirm Order</h1>
          </>
        ) : currentPage === 'orderconfirmation' ? (
          <>
            <h1>Thank you</h1>
            <h3>Order Confirmation:</h3>
            <p>{generateOrderId()}</p>
          </>
        ) : null}

        {cartItems.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div className="pb-placeorder-item" key={item.id}>
                <p className="pb-placeorder-name">{item.name}</p>
                {currentPage !== 'orderconfirmation' && (
                  <>
                    <button className="cart-qty-btn" onClick={() => updateQty(item.id, -1)}>-</button>
                    <p className="pb-placeorder-qty">x {item.qty}</p>
                    <button className="cart-qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                    <button
                      className="pb-trash-button"
                      onClick={() => handleRemoveItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      🗑️
                    </button>
                  </>
                )}
                {currentPage === 'orderconfirmation' && <p className="pb-placeorder-qty">x {item.qty}</p>}
                <p className="pb-placeorder-item-cost">${item.totalCost.toFixed(2)}</p>
              </div>
            ))}

            {itemToRemove && currentPage !== 'orderconfirmation' && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h3>Remove {itemToRemove.name} from cart?</h3>
                  <button className="delete-qty-button" onClick={() => handleConfirmDelete(itemToRemove.id)}>Yes</button>
                  <button className="delete-qty-button" onClick={handleCloseModal}>No</button>
                </div>
              </div>
            )}

            <div className="pb-placeorder-summary">
              <p className="pb-placeorder-subtotal">
                <strong>Subtotal:</strong> ${subtotal.toFixed(2)}
              </p>
              <p className="pb-placeorder-tax">
                <strong>Tax (7%):</strong> ${tax.toFixed(2)}
              </p>
              <p className="pb-placeorder-total">
                <strong>Total:</strong> ${total.toFixed(2)}
              </p>
            </div>
          </>
        )}

        <div className="pb-placeorder-actions">
          <button
            className="pb-addcart-button"
            onClick={() =>
              switchPages(currentPage === 'orderconfirmation' ? 'home' : 'orderconfirmation')
            }
          >
            {currentPage === 'orderconfirmation' ? 'Order More' : 'Place Order'}
          </button>
        </div>
      </div>
    );
  };



  return (
    <div className="pb-page">
      {/* header */}
      <header className="pb-header">
        <button >
          <img className="pb-home-icon" onClick={() => switchPages('home', true)} src="PbCafe/shopping.png" alt="Home" />
        </button>
        <button className="pb-cart-icon" onClick={() => switchPages('place-order')} >
          <i className="bi bi-cart-fill" style={{ fontSize: "30px", color: "black" }}></i>
          {cartItems.length > 0 && <span id="pb-shopping-qty">{cartItems.length}</span>}
        </button>

      </header>

      {getBreadCrumb()}
      {/* home */}
      {currentPage === 'home' && (
        <>
          {getHome()}
          <PbFeatured />
          {getMenu()}
        </>
      )}
      {/* body */}
      <div className="pb-body">
        {/* order */}
        {currentPage === 'order' && (
          <>
            {getMenu()}
          </>
        )}
        {currentPage === 'about' && (
          <>
            {getHome()}
            <PbAbout />
          </>
        )}
        {/* item details */}
        {currentPage === 'item-details' && (
          <div className="pb-details-container">
            <img className="pb-details-img" src={selectedItem.img}></img>
            <div className="pb-details">
              <div className="pb-detailinfo">
                <h2>{selectedItem.name}</h2>
                <p>{selectedItem.description}</p>
                <p id="pb-details-cost">${selectedItem.cost.toFixed(2)}</p>
              </div>
              <div className="pb-user-detail">
                <div className="pb-qty">
                  <button className="pb-qty-button" onClick={() => handleQty('decrease')}>-</button>
                  <span >{qty}</span>
                  <button className="pb-qty-button" onClick={() => handleQty('increase')}>+</button>
                </div>
                {/*Add to cart button */}
                <button className="pb-addcart-button" onClick={() => handleAddToCart(selectedItem)}>Add to Cart</button>

              </div>
            </div>

          </div>
        )}
        {/* place-order */}
        {currentPage === 'place-order' && (
          <div className="placeorder-page">
            {getPlaceConfirmOrder()}
          </div>
        )}
        {/* confirm */}
        {currentPage === 'orderconfirmation' && (
          <div className="placeorder-page">
            {getPlaceConfirmOrder()}
          </div>
        )}

      </div>

    </div>
  );
}

export default Main;
