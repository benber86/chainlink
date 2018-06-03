package assets

import (
	"fmt"
	"math/big"

	"github.com/willf/pad"
)

func format(i *big.Int, precision int) string {
	v := "1" + pad.Right("", precision, "0")
	d := &big.Int{}
	d.SetString(v, 10)
	r := &big.Rat{}
	r.SetFrac(i, d)
	return fmt.Sprintf("%v", r.FloatString(precision))
}

// Link contains a field to represent the smallest units of LINK
type Link big.Int

// NewLink returns a new struct to represent LINK from it's smallest unit
func NewLink(w int64) *Link {
	return (*Link)(big.NewInt(w))
}

func (l *Link) String() string {
	return format((*big.Int)(l), 18)
}

// SetInt64 delegates to *big.Int.SetInt64
func (l *Link) SetInt64(w int64) *Link {
	return (*Link)((*big.Int)(l).SetInt64(w))
}

// SetString delegates to *big.Int.SetString
func (l *Link) SetString(s string, base int) (*Link, bool) {
	w, ok := (*big.Int)(l).SetString(s, base)
	return (*Link)(w), ok
}

// MarshalText implements the encoding.TextMarshaler interface.
func (l *Link) MarshalText() ([]byte, error) {
	return (*big.Int)(l).MarshalText()
}

// UnmarshalText implements the encoding.TextUnmarshaler interface.
func (l *Link) UnmarshalText(text []byte) error {
	if _, ok := l.SetString(string(text), 10); !ok {
		return fmt.Errorf("assets: cannot unmarshal %q into a *assets.Link", text)
	}
	return nil
}

// Eth contains a field to represent the smallest units of ETH
type Eth big.Int

// NewEth returns a new struct to represent ETH from it's smallest unit
func NewEth(w int64) *Eth {
	return (*Eth)(big.NewInt(w))
}

func (e *Eth) String() string {
	return format((*big.Int)(e), 18)
}

// SetInt64 delegates to *big.Int.SetInt64
func (e *Eth) SetInt64(w int64) *Eth {
	return (*Eth)((*big.Int)(e).SetInt64(w))
}

// SetString delegates to *big.Int.SetString
func (e *Eth) SetString(s string, base int) (*Eth, bool) {
	w, ok := (*big.Int)(e).SetString(s, base)
	return (*Eth)(w), ok
}

// MarshalText implements the encoding.TextMarshaler interface.
func (e *Eth) MarshalText() ([]byte, error) {
	return (*big.Int)(e).MarshalText()
}

// UnmarshalText implements the encoding.TextUnmarshaler interface.
func (e *Eth) UnmarshalText(text []byte) error {
	if _, ok := e.SetString(string(text), 10); !ok {
		return fmt.Errorf("assets: cannot unmarshal %q into a *assets.Eth", text)
	}
	return nil
}

// IsZero returns true when the value is 0 and false otherwise
func (e *Eth) IsZero() bool {
	zero := big.NewInt(0)
	return (*big.Int)(e).Cmp(zero) == 0
}
